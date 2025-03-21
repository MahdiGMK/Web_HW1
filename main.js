addEventListener("DOMContentLoaded", (event) => {
  allInputs = document.querySelectorAll("input");
  allFormulae = document.querySelectorAll("formula");

  allInputs.forEach((input) => {
    input.addEventListener("input", updateFormulae);
  });
  updateFormulae();
});
function updateFormulae() {
  allFormulae.forEach(updateFormula);
}
function updateFormula(formula) {
  formula.innerText = eval(formula.getAttribute("evaluator"));
}
function eval(evalstr) {
  scope = {};
  allInputs.forEach((inp) => {
    scope[inp.id] = parseFloat(inp.value);
  });
  res = math.evaluate(evalstr, scope);
  if (isNaN(res)) return "Invalid Formula";
  else return res;
}
