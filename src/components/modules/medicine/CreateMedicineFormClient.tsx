"use client";

import { createMedicineAction } from "@/services/medicine.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

const medicineSchema = z.object({
  name: z.string().min(3).max(50),
  price: z.number(),
  stock: z.number(),
  expiryDate: z.date(),
  category: z.string(),
  manufacturer: z.string(),
  description: z.string(),
});

export function CreateMedicineFormClient() {
  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      expiryDate: new Date(),
      category: "",
      manufacturer: "",
      description: "",
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      try {
        const formData = new FormData();
        formData.append("name", value.name);
        formData.append("price", String(value.price));
        formData.append("stock", String(value.stock));
        formData.append("expiryDate", value.expiryDate.toISOString());
        formData.append("category", value.category);
        formData.append("manufacturer", value.manufacturer);
        formData.append("description", value.description);

        const res = (await createMedicineAction(formData)) as { error?: unknown };

        if (res?.error) {
          const errorMessage =
            typeof res.error === "object" &&
            res.error !== null &&
            "message" in res.error
              ? (res.error as { message: string }).message
              : "Unknown error";
          toast.error(errorMessage, { id: toastId });
          return;
        }

        toast.success("Medicine Created", { id: toastId });
      } catch {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="medicine"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Medicine Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Paracetamol"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Price */}
            <form.Field name="price">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="100"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Stock */}
            <form.Field name="stock">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="50"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Expiry Date */}
            <form.Field name="expiryDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Expiry Date</FieldLabel>

                    <Input
                      type="date"
                      id={field.name}
                      value={
                        field.state.value instanceof Date
                          ? field.state.value.toISOString().slice(0, 10)
                          : ""
                      }
                      onChange={(e) => {
                        const value = e.target.value; // YYYY-MM-DD

                        // Create a Date at midnight UTC to avoid timezone bugs
                        if (value) {
                          field.handleChange(
                            new Date(`${value}T00:00:00.000Z`),
                          );
                        }
                      }}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Category */}
            <form.Field name="category">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Painkiller"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Manufacturer</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Square Pharma"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Medicine details..."
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button form="medicine" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
