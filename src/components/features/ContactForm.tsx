"use client";

import { useState, FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription } from "../ui/alert";

interface FormData {
  name: string;
  email: string;
  phone: string;
  store?: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    store: undefined,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Възникна грешка");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        store: undefined,
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Възникна грешка. Моля, опитайте отново."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Изпратете ни съобщение
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name">Име *</Label>
          <Input
            id="name"
            type="text"
            required
            minLength={2}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
            className="w-full"
            placeholder="Вашето име"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email">Имейл *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={loading}
            className="w-full"
            placeholder="example@email.com"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            minLength={10}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            disabled={loading}
            className="w-full"
            placeholder="+359 ..."
          />
        </div>

        {/* Store Selection */}
        <div className="space-y-2">
          <Label htmlFor="store">Магазин</Label>
          <Select
            value={formData.store}
            onValueChange={(value: string) =>
              setFormData({ ...formData, store: value })
            }
            disabled={loading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Изберете магазин" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grocery">Хранителен</SelectItem>
              <SelectItem value="industrial">Индустриален</SelectItem>
              <SelectItem value="construction">Строителен</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message">Съобщение *</Label>
          <Textarea
            id="message"
            required
            minLength={10}
            rows={5}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            disabled={loading}
            className="w-full resize-none"
            placeholder="Вашето съобщение..."
          />
        </div>

        {/* Success Message */}
        {success && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              ✓ Вашето съобщение е изпратено успешно! Ще се свържем с вас скоро.
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert className="bg-red-50 border-red-200">
            <AlertDescription className="text-red-800">
              ✕ {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {loading ? "Изпращане..." : "Изпрати"}
        </Button>
      </form>
    </div>
  );
}

