import GoogleSignInButton from "@/features/ui/auth/GoogleSignInButton";
import { Suspense } from "react";

// Server Component - handles SSR
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl font-bold text-white">🏝️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Turismo Canarias
          </h1>
          <p className="text-gray-600">
            Descubre las maravillas de las Islas Canarias
          </p>
        </div>

        {/* Login Form */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              Iniciar Sesión
            </h2>
          </div>

          {/* Google Sign-In Button - Client Component */}
          <Suspense fallback={<LoginButtonSkeleton />}>
            <GoogleSignInButton />
          </Suspense>

          {/* Features */}
          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 text-center mb-4">
              Con tu cuenta podrás:
            </p>
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Guardar destinos favoritos</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Recibir ofertas personalizadas</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>Acceder a guías exclusivas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function LoginButtonSkeleton() {
  return (
    <div className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm bg-white">
      <div className="flex items-center space-x-3">
        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  );
}
