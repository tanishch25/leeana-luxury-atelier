import React from 'react'
import { MessageCircle, Mail, ArrowUpRight } from 'lucide-react'

const WHATSAPP_PREFILL =
  'Hello Leeana Casting Desk,\n\nI would like to submit my profile for the Leeana model roster.\n\nFull Name:\nAge:\nHeight:\nCity:\nPhone:\nInstagram / Portfolio Link:'

export const OpportunitiesPage: React.FC = () => {
  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/919916101011?text=${encodeURIComponent(WHATSAPP_PREFILL)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-28 sm:pt-36 pb-28 sm:pb-36">
      {/* 1. Editorial Split Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 space-y-7">
            <h1 className="font-couture text-4xl sm:text-6xl lg:text-[4.25rem] leading-[1.02] tracking-[-0.03em] text-white">
              Join The Leeana Roster
            </h1>

            <p className="text-[16px] sm:text-[17px] text-white/75 leading-[1.72] font-sans max-w-xl">
              Leeana welcomes fresh faces, experienced editorial models, and hand or beauty specialists for haute couture lookbooks, fine jewellery campaigns, and luxury brand films shot on our Bengaluru soundstage.
            </p>

            <p className="text-[15px] text-white/55 leading-[1.7] font-sans max-w-xl">
              Every submission is reviewed directly by our casting director in Indiranagar. Connect over WhatsApp or email your unretouched daylight digitals to be considered for upcoming commercial and editorial commissions.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white text-black text-[13.5px] font-medium hover:bg-neutral-200 transition-[background-color,transform] duration-200 apple-press cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact On WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="mailto:info@leeana.in?subject=Leeana%20Model%20Roster%20Submission"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white/[0.06] border border-white/[0.14] text-white text-[13.5px] font-medium hover:bg-white/[0.12] hover:border-white/30 transition-[background-color,border-color,transform] duration-200 apple-press"
              >
                <Mail className="w-4 h-4" />
                <span>info@leeana.in</span>
              </a>
            </div>
          </div>

          {/* Right Studio Production Photograph */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[24px] bg-[#08080b] border border-white/[0.1] aspect-[4/5] max-h-[640px] w-full shadow-[0_32px_90px_rgba(0,0,0,0.8)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />
              <img
                src="/assets/opp-soundstage-shoot.jpg"
                alt="Editorial talent filming on the Leeana Bengaluru soundstage"
                className="w-full h-full object-cover object-center contrast-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030303]/70 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Production Divisions */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-28 sm:mt-36">
        <div className="max-w-2xl mb-12 space-y-4">
          <h2 className="font-couture text-3xl sm:text-5xl tracking-[-0.025em] leading-[1.06] text-white">
            Production Divisions
          </h2>
          <p className="text-[15.5px] text-white/60 leading-relaxed font-sans">
            We cast specifically to match the pacing, lighting discipline, and garment craft required by each production vertical.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Couture & Bridal Draping */}
          <article className="lg:col-span-5 group relative overflow-hidden rounded-[24px] bg-[#08080b] border border-white/[0.1] flex flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              <img
                src="/assets/opp-couture-model.jpg"
                alt="Editorial model draped in architectural monochrome linen couture"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-transparent opacity-70" />
            </div>
            <div className="p-7 sm:p-8 space-y-3 flex-1 flex flex-col justify-end">
              <h3 className="font-couture text-2xl sm:text-[1.75rem] text-white tracking-[-0.02em]">
                Haute Couture & Bridal Draping
              </h3>
              <p className="text-[14.5px] text-white/65 leading-[1.68] font-sans">
                Multi-look designer capsules, archival silk drapes, and heritage bridal couture where posture, handloom fluidity, and natural movement on camera take priority.
              </p>
            </div>
          </article>

          {/* Fine Jewellery & Macro Beauty */}
          <article className="lg:col-span-4 group relative overflow-hidden rounded-[24px] bg-[#08080b] border border-white/[0.1] flex flex-col">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent z-10" />
            <div className="relative aspect-[4/5] overflow-hidden bg-black">
              <img
                src="/assets/opp-jewel-editorial.jpg"
                alt="Close-up luxury fine jewellery studio portrait"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-transparent opacity-70" />
            </div>
            <div className="p-7 sm:p-8 space-y-3 flex-1 flex flex-col justify-end">
              <h3 className="font-couture text-2xl sm:text-[1.75rem] text-white tracking-[-0.02em]">
                Fine Jewellery & Beauty
              </h3>
              <p className="text-[14.5px] text-white/65 leading-[1.68] font-sans">
                High-magnification macro work for solitaire settings, polki sets, and skincare campaigns requiring poised stillness under close cinema primes.
              </p>
            </div>
          </article>

          {/* Commercial Film & Studio Standards Specification Card */}
          <article className="lg:col-span-3 rounded-[24px] bg-[#08080b] border border-white/[0.1] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <div className="space-y-5">
              <h3 className="font-couture text-2xl sm:text-[1.75rem] text-white tracking-[-0.02em] leading-tight">
                Commercial Motion Films
              </h3>
              <p className="text-[14.5px] text-white/65 leading-[1.7] font-sans">
                Timed narrative reels, luxury automotive launches, and resort lookbook films directed indoors on controlled studio sets.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-4">
              <div>
                <div className="text-[13px] font-medium text-white">Studio Location</div>
                <div className="text-[13.5px] text-white/55 mt-0.5">Indiranagar, Bengaluru</div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-white">Representation Model</div>
                <div className="text-[13.5px] text-white/55 mt-0.5">Non-exclusive per-campaign booking</div>
              </div>
              <div>
                <div className="text-[13px] font-medium text-white">Eligibility</div>
                <div className="text-[13.5px] text-white/55 mt-0.5">Ages 18 and above across India</div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 3. Submission Brief & Studio Terms */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-28 sm:mt-36">
        <div className="max-w-2xl mb-12 space-y-4">
          <h2 className="font-couture text-3xl sm:text-5xl tracking-[-0.025em] leading-[1.06] text-white">
            Submission Brief & Studio Terms
          </h2>
          <p className="text-[15.5px] text-white/60 leading-relaxed font-sans">
            Prepare the details below before messaging our desk so your profile can be shortlisted accurately for upcoming bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Panel: Required Digitals */}
          <div className="relative rounded-[24px] bg-[#08080b]/95 border border-white/[0.1] p-7 sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <h3 className="font-couture text-2xl sm:text-3xl text-white tracking-[-0.02em] mb-7">
              What To Send
            </h3>

            <div className="divide-y divide-white/[0.08]">
              <div className="pb-5">
                <h4 className="text-[15px] font-medium text-white mb-1.5">
                  Three Unretouched Daylight Digitals
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Include a straight-on headshot, a side profile, and a full-length portrait against a neutral wall in natural light with minimal styling and fitted monochrome attire.
                </p>
              </div>

              <div className="py-5">
                <h4 className="text-[15px] font-medium text-white mb-1.5">
                  Verified Physical Specifications
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Provide your full legal name, confirmed age (18+), height in centimetres or feet/inches, current residential city, clothing and shoe sizing, and direct telephone number.
                </p>
              </div>

              <div className="pt-5">
                <h4 className="text-[15px] font-medium text-white mb-1.5">
                  Walk Clip & Portfolio Link
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Attach a short 15-second natural walk clip or public Instagram profile URL. Fresh talent without formal portfolios are welcome to submit clean smartphone daylight frames.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel: Engagement Terms */}
          <div className="relative rounded-[24px] bg-[#08080b]/95 border border-white/[0.1] p-7 sm:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            <h3 className="font-couture text-2xl sm:text-3xl text-white tracking-[-0.02em] mb-7">
              Production Standards
            </h3>

            <div className="divide-y divide-white/[0.08]">
              <div className="pb-5">
                <h4 className="text-[15px] font-medium text-white mb-1.5">
                  Written Usage & Clear Day Rates
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Every confirmed commission carries a written call sheet specifying shoot hours, commercial licensing scope, and guaranteed settlement within 14 business days of wrap.
                </p>
              </div>

              <div className="py-5">
                <h4 className="text-[15px] font-medium text-white mb-1.5">
                  Closed-Set Indiranagar Hospitality
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Private changing suites, on-set wardrobe draping, hair, makeup, and full catering are provided throughout production inside our private Bengaluru soundstage.
                </p>
              </div>

              <div className="pt-5">
                <h4 className="text-[15px] font-medium text-white mb-1.5">
                  Non-Exclusive Roster Flexibility
                </h4>
                <p className="text-[14px] text-white/60 leading-relaxed">
                  Roster members keep complete autonomy over independent agency contracts and brand collaborations. Call sheets are shared 48 hours ahead for availability confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Direct Submission CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 mt-20 sm:mt-24">
        <div className="relative rounded-[24px] bg-[#08080b] border border-white/[0.1] p-8 sm:p-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          <div className="space-y-3 max-w-2xl">
            <h2 className="font-couture text-3xl sm:text-4xl text-white tracking-[-0.02em]">
              Send Your Profile To Casting
            </h2>
            <p className="text-[15px] text-white/65 leading-relaxed font-sans">
              Reach our Bengaluru talent coordinators directly on WhatsApp or send high-resolution digitals to info@leeana.in. No third-party forms required.
            </p>
            <p className="text-[13px] text-white/45 pt-1 font-sans">
              Casting Desk Hours: Monday to Saturday, 10:00 AM to 7:00 PM IST — Indiranagar, Bengaluru
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white text-black text-[13.5px] font-medium hover:bg-neutral-200 transition-[background-color,transform] duration-200 apple-press cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp +91 99161 01011</span>
            </button>

            <a
              href="mailto:info@leeana.in?subject=Leeana%20Model%20Roster%20Submission"
              className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-full bg-white/[0.06] border border-white/[0.14] text-white text-[13.5px] font-medium hover:bg-white/[0.12] hover:border-white/30 transition-[background-color,border-color,transform] duration-200 apple-press"
            >
              <Mail className="w-4 h-4" />
              <span>info@leeana.in</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
