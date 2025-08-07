import FAQ from "@/components/FAQ";
import styles from "@/styles/FAQ.module.css";

const faqs = [
  {
    question: "How to open an account?",
    answer:
      "Account opening is very easy. Just need to click Sign Up and enter some initial details for opening account. After that you need to verify your email address and that's ready to go.",
  },
  {
    question: "How to deposit Money?",
    answer:
      "You can deposit money via online payment gateway such as PayPal, Stripe, Razorpay, Paystack, Flutterwave as well as BlockChain for bitcoin. You can also deposit money by coming to our office physically.",
  },
  {
    question: "How to withdraw money from my account?",
    answer:
      "We have different types of withdraw method. You can withdraw money to your bank account as well as your mobile banking account.",
  },
  {
    question: "How to Apply for Loan?",
    answer: "You can apply loan based on your collateral.",
  },
  {
    question: "How to Apply for Fixed Deposit?",
    answer:
      "If you have available balance in your account then you can apply for fixed deposit.",
  },
];

const Faq = () => {
  return (
    <section className="pb-24 px-4 sm:px-8 md:px-24">
      <div className={styles.policy}>
        <div className={styles.pad}>
          <h1 className="text-white text-3xl">Frequently Asked Questions</h1>
        </div>
        {faqs.map((items: any, index: any) => (
          <FAQ key={index} answer={items.answer} question={items.question} />
        ))}
      </div>
    </section>
  );
};

export default Faq;
