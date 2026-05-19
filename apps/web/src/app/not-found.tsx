import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Страницата не е намерена
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Съжаляваме, но страницата, която търсите, не съществува или е била
          преместена.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild variant="default" size="lg">
          <Link href="/" className="gap-2">
            <Home className="w-4 h-4" />
            Към Началото
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact" className="gap-2">
            <Search className="w-4 h-4" />
            Свържете се с нас
          </Link>
        </Button>
      </div>
    </div>
  );
}
