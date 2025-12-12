import "../styles/Policies.css";

export default function RefundPolicy() {
  return (
    <div className="policy-container">

      {/* ------------------ ARABIC ------------------ */}
      <h1>سياسة الاسترجاع</h1>
      <p><strong>آخر تحديث: 08-12-2025</strong></p>

      <p>
        نظرًا لأن المحتوى رقمي ويتم الوصول إليه فور الشراء، فإن مبلغ الدفع لا يمكن استرجاعه
        بعد إتمام العملية.
      </p>

      <h3>1. عدم إمكانية الاسترجاع</h3>
      <p>بعد منح الوصول، لا يمكن استرداد المبلغ.</p>

      <h3>2. استثناءات</h3>
      <ul>
        <li>عدم حصول المستخدم على المحتوى بعد الدفع</li>
        <li>حدوث مشكلة تقنية من جانبنا</li>
      </ul>

      <h3>3. للتواصل</h3>
      <p>
        البريد الإلكتروني: <a href="mailto:talented-learning@outlook.com">talented-learning@outlook.com</a><br/>
        الهاتف: 01011049620 ,01011689996 <br/>
        العنوان: اكتوبر – الجيزة – مصر
      </p>

      <hr/>

      {/* ------------------ ENGLISH ------------------ */}
      <h1>Refund Policy</h1>
      <p><strong>Last Updated: 08-12-2025</strong></p>

      <p>
        Since the content is digital and instantly accessible upon purchase, payments
        cannot be refunded once access is granted.
      </p>

      <h3>1. Non-Refundable</h3>
      <p>No refunds are available after access is provided.</p>

      <h3>2. Exceptions</h3>
      <ul>
        <li>User does not receive the content after payment</li>
        <li>A technical issue occurs from our side</li>
      </ul>

      <h3>3. Contact Us</h3>
      <p>
        Email: <a href="mailto:talented-learning@outlook.com">talented-learning@outlook.com</a><br/>
        Phone: 01011049620 , 01011689996 <br/>
        Address: October – Giza – Egypt
      </p>
    </div>
  );
}
