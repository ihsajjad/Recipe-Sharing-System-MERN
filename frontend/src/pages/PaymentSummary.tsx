import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { PaymentIntentType } from "../../../backend/src/shared/types";
import { stripePromise } from "../api-client";
import CheckOutForm from "../components/CheckOutForm";

const PaymentSummary = () => {
  const location = useLocation();

  const paymentIntent = location.state as PaymentIntentType;

  const options = {
    clientSecret: location.state.clientSecret,
  };
  return (
    <div className="py-10 flex items-center justify-center">
      {location.state && (
        <Elements stripe={stripePromise} options={options}>
          <CheckOutForm paymentIntent={paymentIntent} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentSummary;
