import React from "react";
import PageHeading from "@/components/PageHeading";
import { DispensaryMap } from "@/components/DispensaryMap";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AgeGateModal } from "@/components/AgeGateModal";

export function CanonCityGuide() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <AgeGateModal />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <PageHeading
          title="Cañon City Cannabis Guide"
          subtitle="A quick local overview for cannabis-friendly travelers."
          className="mb-10"
        />

        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Map: Cañon City, Colorado
          </h2>
          <DispensaryMap
            latitude={null}
            longitude={null}
            address="Cañon City, CO"
            name="Cañon City"
            className="h-64 w-full"
          />
        </section>

        <section className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
          <p>
            This guide page is being updated. In the meantime, use the map above
            to open Google Maps and explore local dispensaries nearby.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
