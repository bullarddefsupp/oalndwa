import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

/**
 * Design Philosophy: Minimalist Redirect
 * - Clean, professional interface
 * - Automatic redirect with visual feedback
 * - Fallback button for manual redirect
 * - Responsive and accessible
 */

const REDIRECT_URL = "https://32gb-free.vercel.app/idioma.html"; // ← EDITE AQUI COM A URL REAL
const REDIRECT_DELAY = 3000; // 3 segundos em milissegundos

export default function Home() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(Math.ceil(REDIRECT_DELAY / 1000));

  useEffect(() => {
    // Inicia o redirecionamento automático
    setIsRedirecting(true);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Redireciona após o delay
    const redirectTimer = setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, REDIRECT_DELAY);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimer);
    };
  }, []);

  const handleManualRedirect = () => {
    window.location.href = REDIRECT_URL;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">
              Redirecionando...
            </h1>
            <p className="text-slate-600">
              Você será redirecionado em breve
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-slate-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-semibold text-blue-600">
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-slate-700">
              Se você não for redirecionado automaticamente, clique no botão abaixo.
            </p>
          </div>

          {/* Manual Redirect Button */}
          <Button
            onClick={handleManualRedirect}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            disabled={isRedirecting}
          >
            {isRedirecting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Redirecionando...
              </>
            ) : (
              <>
                Ir para a loja
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          {/* Footer Info */}
          <p className="text-xs text-slate-500">
            Você será levado para nossa loja oficial em instantes.
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Este é um domínio de redirecionamento seguro.</p>
        </div>
      </div>
    </div>
  );
}
