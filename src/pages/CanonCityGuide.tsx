import React from 'react'
import { PageHeading } from '@/components/PageHeading'
import { DispensaryMap } from '@/components/DispensaryMap'
import { ProductsSection } from '@/components/ProductsSection'
import { ReviewsSection } from '@/components/ReviewsSection'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { AgeGateModal } from '@/components/AgeGateModal'

export function CanonCityGuide() {
  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-900/30">
      <ScrollToTop />
      <AgeGateModal />
      
      <PageHeading 
        title="Canon City Cannabis Guide" 
        subtitle="Explore the High Desert's Green Treasures" 
      />

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-6">
            Dispensary Highlights 🌿
          </h2>
          <DispensaryMap city="Canon City" />
        </section>

        <ProductsSection 
          city="Canon City" 
          description="Premium Cannabis Selection in the Royal Gorge Region" 
        />

        <ReviewsSection 
          city="Canon City" 
          subtitle="Community Cannabis Experiences" 
        />
      </div>

      <Footer />
    </div>
  )
}