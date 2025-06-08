import React, { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckoutForm as CheckoutFormType } from "@/types";
import { validateCheckoutForm } from "@/utils";
import styles from "../Checkout.module.css";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormType) => void;
  loading?: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onSubmit,
  loading,
}) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<CheckoutFormType>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateCheckoutForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {t("checkout.shippingAddress", "Shipping Information") ?? ""}
        </h3>
        <div className={styles.grid}>
          <Input
            label={t("checkout.firstName", "First Name") ?? ""}
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
            fullWidth
          />
          <Input
            label={t("checkout.lastName", "Last Name") ?? ""}
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
            fullWidth
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
            fullWidth
          />
          <Input
            label={t("checkout.phone", "Phone") ?? ""}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            fullWidth
          />
          <div className={styles.fullWidth}>
            <Input
              label={t("checkout.address", "Address") ?? ""}
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              required
              fullWidth
            />
          </div>
          <Input
            label={t("checkout.city", "City") ?? ""}
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
            fullWidth
          />
          <Input
            label="ZIP Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            error={errors.zipCode}
            required
            fullWidth
          />
          <Input
            label={t("checkout.country", "Country") ?? ""}
            name="country"
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
            required
            fullWidth
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          {t("checkout.payment.info", "Payment Information") ?? ""}
        </h3>
        <div className={styles.grid}>
          <div className={styles.fullWidth}>
            <InputMask
              mask="9999 9999 9999 9999"
              maskChar={null}
              value={formData.cardNumber}
              onChange={handleChange}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  label={t("checkout.payment.cartNumber", "Card Number") ?? ""}
                  name="cardNumber"
                  error={errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  required
                  fullWidth
                />
              )}
            </InputMask>
          </div>

          <div className={styles.fullWidth}>
            <Input
              label={t("checkout.payment.cartName", "Cardholder Name") ?? ""}
              name="cardName"
              value={formData.cardName}
              onChange={(e) => {
                // Only allow letters and spaces
                const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    value,
                    name: "cardName",
                  },
                });
              }}
              error={errors.cardName}
              required
              fullWidth
            />
          </div>

          <InputMask
            mask="99/99"
            maskChar={null}
            value={formData.expiryDate}
            onChange={handleChange}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                label={t("checkout.payment.cartExp", "Expiry Date") ?? ""}
                name="expiryDate"
                error={errors.expiryDate}
                placeholder="MM/YY"
                required
                fullWidth
              />
            )}
          </InputMask>

          <InputMask
            mask="9999"
            maskChar={null}
            value={formData.cvv}
            onChange={handleChange}
          >
            {(inputProps) => (
              <Input
                {...inputProps}
                label="CVV"
                name="cvv"
                error={errors.cvv}
                placeholder="123"
                maxLength={4}
                required
                fullWidth
              />
            )}
          </InputMask>
        </div>
      </div>

      <Button
        type="submit"
        size="large"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        {t("checkout.placeOrder", "Place Order") ?? ""}
      </Button>
    </form>
  );
};
