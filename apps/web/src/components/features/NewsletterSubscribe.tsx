"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSubscribeProps {
  accentColor?: string;
}

const storeOptions = [
  { value: "all", label: "Всички обекти" },
  { value: "supermarket", label: "Супермаркет" },
  { value: "industrial", label: "Домашни потреби" },
  { value: "construction", label: "Строителство" },
];

export function NewsletterSubscribe({
  accentColor = "#E53E3E",
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [store, setStore] = useState("all");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, store }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Благодарим! Абонирахте се успешно.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Възникна грешка. Опитайте отново.");
      }
    } catch {
      setStatus("error");
      setMessage("Възникна грешка. Опитайте отново.");
    }
  }

  return (
    <section className="section-tight">
      <div className="container">
        <motion.div
          className="rounded-[26px] p-8 md:p-12 text-white"
          style={{ background: accentColor }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "white" }}>
              Абонирайте се за седмичния бюлетин
            </h2>
            <p className="text-white/80 mb-6">
              Получавайте седмични оферти и новини директно в имейла. Без спам.
            </p>

            {status === "success" ? (
              <div className="flex items-center justify-center gap-2 text-white">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{message}</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Input
                  type="email"
                  placeholder="Вашият имейл"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-11"
                />
                <select
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                  className="h-11 px-3 rounded-md bg-white/10 border border-white/20 text-white text-sm"
                >
                  {storeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="text-gray-900">
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-white text-gray-900 hover:bg-white/90 h-11 font-semibold"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {status === "loading" ? "Изпращане..." : "Абонирай се"}
                </Button>
              </form>
            )}

            {status === "error" && (
              <p className="text-white/90 text-sm mt-3">{message}</p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
