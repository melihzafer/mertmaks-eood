"use client";

import { useState, useEffect } from "react";
import {
  MessageSquarePlus,
  Star,
  Loader2,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const feedbackCategories = [
  { value: "service", label: "Обслужване", emoji: "🤝" },
  { value: "products", label: "Продукти", emoji: "🛒" },
  { value: "website", label: "Уебсайт", emoji: "💻" },
  { value: "other", label: "Друго", emoji: "💬" },
];

const ratingLabels = [
  "Много лошо",
  "Лошо",
  "Задоволително",
  "Добро",
  "Отлично",
];

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState("service");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  // Delay showing widget to avoid initial page load flash
  useEffect(() => {
    const timer = setTimeout(() => setShowWidget(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Моля, изберете оценка.", {
        description: "Трябва да изберете минимум 1 звезда.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          category,
          comment: comment.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Възникна грешка");
      }

      setIsSubmitting(false);
      setIsSuccess(true);

      // Show success state for 2 seconds
      setTimeout(() => {
        setIsOpen(false);
        toast.success("Благодарим ви!", {
          description: "Вашето мнение ще ни помогне да се усъвършенстваме.",
        });

        // Reset form after dialog closes
        setTimeout(() => {
          setRating(0);
          setCategory("service");
          setComment("");
          setIsSuccess(false);
        }, 300);
      }, 2000);
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Възникна грешка", {
        description:
          error instanceof Error
            ? error.message
            : "Моля, опитайте отново по-късно.",
      });
    }
  };

  const displayRating = hoveredRating || rating;

  if (!showWidget) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <motion.button
            className="group relative flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-5 py-3 text-white shadow-xl hover:shadow-2xl transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              <MessageSquarePlus className="h-5 w-5" />
            </motion.div>
            <span className="font-medium hidden sm:inline">Обратна връзка</span>
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 2 }}
            >
              <Sparkles className="h-3 w-3" />
            </motion.div>
          </motion.button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex flex-col items-center justify-center p-12 text-center overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-green-400 via-blue-500 to-purple-600 opacity-10"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="relative z-10"
              >
                <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">
                Благодарим ви!
              </h3>
              <p className="text-gray-600 relative z-10">
                Вашето мнение е ценно за нас.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative bg-linear-to-r from-blue-600 to-purple-600 p-6 text-white overflow-hidden">
                {/* Animated circles background */}
                <motion.div
                  className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
                  animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"
                  animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />

                <DialogHeader className="relative z-10">
                  <DialogTitle className="text-2xl text-white">
                    Вашето мнение е важно
                  </DialogTitle>
                  <DialogDescription className="text-blue-100">
                    Помогнете ни да станем по-добри. Оценката ви е напълно
                    анонимна.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-6 bg-linear-to-b from-gray-50 to-white"
              >
                {/* Rating Section */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    Как бихте оценили вашето преживяване?
                  </Label>
                  <div className="flex justify-center items-center gap-2 py-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-all"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          className={`h-10 w-10 transition-all ${
                            star <= displayRating
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                              : "text-gray-300 hover:text-gray-400"
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    {displayRating > 0 && (
                      <motion.p
                        key={displayRating}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-center text-sm font-medium text-gray-700"
                      >
                        {ratingLabels[displayRating - 1]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Category Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">
                    За какво е обратната връзка?
                  </Label>
                  <RadioGroup value={category} onValueChange={setCategory}>
                    <div className="grid grid-cols-2 gap-3">
                      {feedbackCategories.map((cat) => (
                        <label
                          key={cat.value}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            category === cat.value
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                        >
                          <RadioGroupItem
                            value={cat.value}
                            className="sr-only"
                          />
                          <span className="text-2xl">{cat.emoji}</span>
                          <span className="text-sm font-medium">
                            {cat.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Comment Section */}
                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-base font-semibold">
                    Вашият коментар (по желание)
                  </Label>
                  <Textarea
                    id="comment"
                    placeholder="Споделете вашите впечатления, предложения или препоръки..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none min-h-[100px] focus-visible:ring-blue-600"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 text-right">
                    {comment.length}/500 символа
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="w-full h-11 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Изпращане...
                    </>
                  ) : (
                    <>
                      <MessageSquarePlus className="mr-2 h-5 w-5" />
                      Изпрати мнение
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
