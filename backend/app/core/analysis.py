import ast
import re

async def analyze_code(code: str, language: str) -> dict:
    """
    Performs static analysis on the provided code.
    For Python, it uses the AST module for deeper analysis.
    For other languages, it uses regex-based pattern matching.
    """
    issues = []
    metrics = {
        "complexity": 0,
        "lines_of_code": len(code.split('\n')),
        "function_count": 0,
        "class_count": 0
    }

    if language.lower() == "python":
        try:
            tree = ast.parse(code)
            
            # AST Analysis
            for node in ast.walk(tree):
                # Check for Function Definitions
                if isinstance(node, ast.FunctionDef):
                    metrics["function_count"] += 1
                    # Check function name style (snake_case)
                    if not re.match(r'^[a-z_][a-z0-9_]*$', node.name):
                        issues.append({
                            "line": node.lineno,
                            "severity": "Low",
                            "type": "Style",
                            "message": f"Function name '{node.name}' should be snake_case.",
                            "suggestion": "Rename to follow PEP 8 conventions."
                        })
                    # Check function length
                    if node.end_lineno - node.lineno > 20:
                        issues.append({
                            "line": node.lineno,
                            "severity": "Medium",
                            "type": "Complexity",
                            "message": f"Function '{node.name}' is too long ({node.end_lineno - node.lineno} lines).",
                            "suggestion": "Refactor into smaller functions."
                        })

                # Check for Class Definitions
                elif isinstance(node, ast.ClassDef):
                    metrics["class_count"] += 1
                    # Check class name style (PascalCase)
                    if not re.match(r'^[A-Z][a-zA-Z0-9]*$', node.name):
                        issues.append({
                            "line": node.lineno,
                            "severity": "Low",
                            "type": "Style",
                            "message": f"Class name '{node.name}' should be PascalCase.",
                            "suggestion": "Rename to follow PEP 8 conventions."
                        })

                # Security Checks
                elif isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Name):
                        if node.func.id == 'eval':
                            issues.append({
                                "line": node.lineno,
                                "severity": "High",
                                "type": "Security",
                                "message": "Use of 'eval()' is extremely dangerous.",
                                "suggestion": "Use 'ast.literal_eval' or safe parsing methods."
                            })
                        elif node.func.id == 'exec':
                            issues.append({
                                "line": node.lineno,
                                "severity": "High",
                                "type": "Security",
                                "message": "Use of 'exec()' is dangerous.",
                                "suggestion": "Avoid dynamic code execution."
                            })
                        elif node.func.id == 'print':
                             issues.append({
                                "line": node.lineno,
                                "severity": "Low",
                                "type": "Best Practice",
                                "message": "Usage of 'print' statements in production code.",
                                "suggestion": "Use a logging framework instead."
                            })

        except SyntaxError as e:
            issues.append({
                "line": e.lineno,
                "severity": "Critical",
                "type": "Syntax",
                "message": f"Syntax Error: {e.msg}",
                "suggestion": "Fix the syntax error."
            })
        except Exception as e:
             issues.append({
                "line": 1,
                "severity": "High",
                "type": "Analysis Error",
                "message": f"Failed to parse code: {str(e)}",
                "suggestion": "Check code validity."
            })

    else:
        # Regex fallback for other languages (JS, Java, etc.)
        lines = code.split('\n')
        for i, line in enumerate(lines):
            # Console.log check (JS)
            if "console.log" in line and language in ["javascript", "typescript"]:
                issues.append({
                    "line": i + 1,
                    "severity": "Low",
                    "type": "Best Practice",
                    "message": "Console log found.",
                    "suggestion": "Remove before production or use a logger."
                })
            # Generic long line check
            if len(line) > 100:
                issues.append({
                    "line": i + 1,
                    "severity": "Low",
                    "type": "Style",
                    "message": "Line exceeds 100 characters.",
                    "suggestion": "Break line."
                })

    return {
        "issues": issues,
        "metrics": metrics,
        "summary": f"Found {len(issues)} issues. Complexity analysis completed."
    }
