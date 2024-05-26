import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from "@stripe/stripe-js";
import { FormEvent, useContext, useState } from "react";
import { PaymentIntentType } from "../../../backend/src/shared/types";
import { AuthContext, AuthContextType } from "../providers/AuthProvider";

const CheckOutForm = ({
  paymentIntent,
}: {
  paymentIntent: PaymentIntentType;
}) => {
  const { user } = useContext(AuthContext) as AuthContextType;
  const stripe = useStripe() as Stripe;
  const elements = useElements() as StripeElements;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await elements.submit();

    if (error) {
      // todo: show error toast
      console.log(error);
      return;
    }

    setLoading(true);

    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      clientSecret: paymentIntent.clientSecret,
      confirmParams: {
        return_url: import.meta.env.VITE_FRONTEND_URL,
      },
    });

    if (paymentError) {
      console.log(paymentError);
      //   todo: show error toast
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="border rounded-md border-[var(--secondary-color)] max-w-[450px] shadow-xl shadow-[#00000047]"
    >
      <h3 className="text-2xl font-bold text-center bg-[var(--secondary-color)] text-white py-2 rounded-t-md">
        Confirm Your Booking
      </h3>
      <div className="p-3">
        <div className="flex md:flex-row flex-col items-center justify-between gap-2 mb-2">
          <label className="md:flex-1 w-full">
            Name:
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full border border-zinc-300 rounded py-1 px-2 focus:outline-none bg-slate-100"
            />
          </label>
          <label className="md:flex-1 w-full">
            Email:{" "}
            <input
              type="text"
              value={user?.email}
              readOnly
              className="w-full border border-zinc-300 rounded py-1 px-2 focus:outline-none bg-slate-100"
            />
          </label>
        </div>
        <div className="bg-slate-200 text-center py-2 my-5 rounded">
          <span className="text-3xl font-bold text-slate-600">
            Total Cost: ${paymentIntent.amount.toFixed(2)}
          </span>
        </div>
        <PaymentElement className="mt-3" />
        <div className="text-center mt-5">
          <button
            type="submit"
            disabled={!stripe && !loading}
            className="bg-[var(--secondary-color)] text-white py-2 px-4 rounded-full font-bold mx-auto shadow-lg shadow-[#0000001f] duration-300 "
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default CheckOutForm;
