"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, MessageSquarePlus, Star } from "lucide-react";
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
import { accents } from "@/data/redesign-content";

const feedbackCategories = [
  { value: "service", label: "Обслужване", meta: "Екип и отношение" },
  { value: "products", label: "Продукти", meta: "Наличност и качество" },
  { value: "website", label: "Уебсайт", meta: "Дизайн и навигация" },
  { value: "other", label: "Друго", meta: "Идея или препоръка" },
] as const;

type FeedbackCategory = (typeof feedbackCategories)[number]["value"];
type FeedbackStyle = CSSProperties & {
  "--theme-accent"?: string;
};

const WIDGET_SHOW_DELAY_MS = 1500;
const SUCCESS_DISPLAY_MS = 2000;
const RESET_DELAY_MS = 300;

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
  const [category, setCategory] = useState<FeedbackCategory>("service");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showWidget, setShowWidget] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWidget(true), WIDGET_SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
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

      setTimeout(() => {
        setIsOpen(false);
        toast.success("Благодарим ви!", {
          description: "Вашето мнение ще ни помогне да се усъвършенстваме.",
        });

        setTimeout(() => {
          setRating(0);
          setCategory("service");
          setComment("");
          setIsSuccess(false);
        }, RESET_DELAY_MS);
      }, SUCCESS_DISPLAY_MS);
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
        <motion.button
          className="feedback-trigger"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          data-open={isOpen ? "true" : "false"}
          style={{ "--theme-accent": accents.supermarket } as FeedbackStyle}
        >
          <span className="feedback-trigger-icon" aria-hidden="true">
            <MessageSquarePlus className="h-5 w-5" />
          </span>
          <span>Обратна връзка</span>
        </motion.button>
      </DialogTrigger>
      <DialogContent className="feedback-dialog">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="feedback-success"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 className="feedback-success-icon" />
              </motion.div>
              <h3>Благодарим ви</h3>
              <p>
                Вашето мнение е записано и ще помогне за по-добро обслужване.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="feedback-dialog-head">
                <DialogHeader>
                  <DialogTitle>Вашето мнение е важно</DialogTitle>
                  <DialogDescription>
                    Кратка обратна връзка за магазина, продуктите или сайта.
                    Оценката е анонимна.
                  </DialogDescription>
                </DialogHeader>
              </div>

              <form onSubmit={handleSubmit} className="feedback-form">
                <fieldset className="feedback-fieldset">
                  <legend>Как бихте оценили вашето преживяване?</legend>
                  <RadioGroup
                    className="feedback-stars"
                    value={rating ? String(rating) : ""}
                    onValueChange={(value) => setRating(Number(value))}
                    aria-label="Оценка от 1 до 5"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <RadioGroupItem
                        key={star}
                        value={String(star)}
                        aria-label={`${star} от 5: ${ratingLabels[star - 1]}`}
                        className={`feedback-star ${
                          star <= displayRating ? "active" : ""
                        }`}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        <Star className="h-9 w-9" aria-hidden="true" />
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                  <AnimatePresence mode="wait">
                    {displayRating > 0 && (
                      <motion.p
                        key={displayRating}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="feedback-rating-label"
                      >
                        {ratingLabels[displayRating - 1]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </fieldset>

                <div className="feedback-fieldset">
                  <Label>За какво е обратната връзка?</Label>
                  <RadioGroup
                    className="feedback-categories"
                    value={category}
                    onValueChange={(value) =>
                      setCategory(value as FeedbackCategory)
                    }
                  >
                    {feedbackCategories.map((cat) => (
                      <label
                        key={cat.value}
                        className={`feedback-category ${category === cat.value ? "active" : ""}`}
                      >
                        <RadioGroupItem value={cat.value} className="sr-only" />
                        <span>{cat.label}</span>
                        <small>{cat.meta}</small>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="feedback-fieldset">
                  <Label htmlFor="comment">Вашият коментар (по желание)</Label>
                  <Textarea
                    id="comment"
                    placeholder="Споделете вашите впечатления, предложения или препоръки..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="feedback-textarea"
                    maxLength={500}
                  />
                  <p className="feedback-count">{comment.length}/500 символа</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || rating === 0}
                  className="btn color feedback-submit"
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
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
