<div dir="rtl">

# تمرین اول درس طراحی وب

مهدی بهرامیان
401171593

## مراحل پیاده سازی ویژگی مطرح شده

برای پیاده سازی این ویژگی،
فرمت html را تقریبا مشابه همان چیزی که
در متن تمرین آمده است در نظر میگیریم :

<div dir="rtl">

```html
<input type="text" id="fee" placeholder="هزینه" />
<input type="text" id="count" placeholder="تعداد" />
<input type="text" id="discount" placeholder="تخفیف" />
<formula evaluator="count*fee-discount"></formula>
<formula evaluator="count+fee-discount"></formula>
<formula evaluator="count/fee-discount"></formula>
```

</div>

همینطور برای پشتیبانی تمیز و امن از عبارات ریاضی مطرح شده، از
`math.js`
استفاده میکنیم که آنرا با استفاده از cdn میگیریم.

</div>

```html
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/14.2.1/math.js"
  integrity="sha512-ZOpEWF/zdnWKFpyY0TMzmZGkhjM9Z4RkW/GMF9X9NtZ6bhDqzAlWfk7NwqHPD+WriepCt3Th6+4jl4w4wkQolA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
></script>
```

<div dir="rtl">

حال برای پیاده سازی این قابلیت، کافیست تابع
`updateFormulae`
را پیاده کنیم که مسئول محاسبه مقدار تمامی فرمول ها و قراردادن
مقدار محاسبه شده درون
`innerText`
شان است.
این تابع به شکل زیر با استفاده از `math.js` پیاده شده است :

</div>

```js
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
```

<div dir="rtl">

در نهایت کافیست این تابع را در ابتدا، پس از بارگیری کامل محتوی DOM و به ازای
هر تغییر محتوی input های موجود اجرا کنیم.

برای اینکار نیز کد زیر کافیست :

</div>

```js
addEventListener("DOMContentLoaded", (event) => {
  allInputs = document.querySelectorAll("input");
  allFormulae = document.querySelectorAll("formula");

  allInputs.forEach((input) => {
    input.addEventListener("input", updateFormulae);
  });
  updateFormulae();
});
```

<div dir="rtl">

همانطور که مشاهده میکنید، در کل این کد ۲ متغیر گلوبال `allInputs` و
`allFormulae` وجود دارد که کل منطق را کنترل میکنند و به ازای کل فعالیت صفحه
باید وجود داشته باشند.

## نتیجه پیاده سازی

<center>
<iframe src="index.html" width = 100%></iframe>
</center>

همانطور که مشاهده میکنید، در این مثال این سه فرمول به درستی و به شکل
بیدرنگ پردازش میشوند.

</div>
