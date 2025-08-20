import { Button } from "./Button";
import { Card } from "./cards/Card";

export const ProviderCTA: React.FC = () => (
  <section className="mx-auto max-w-7xl px-4 py-8">
    <Card className="p-6 bg-gradient-to-br from-[var(--brand-primary)] to-indigo-900 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <div className="text-2xl font-extrabold">
            Are you a local provider?
          </div>
          <p className="text-white/90 mt-1 max-w-xl">
            Join CanaryAdventure and reach travelers looking for authentic
            island experiences. Publish listings, manage bookings, and get paid
            with Stripe.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="accent" className="flex-1 sm:flex-none">
            Create listing
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none bg-white/10 text-white border-white/30"
          >
            Learn more
          </Button>
        </div>
      </div>
    </Card>
  </section>
);
