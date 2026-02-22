import { About } from '@/components/features/About'
import { BusinessContent } from '@/components/features/BusinessContent'
import { Careers } from '@/components/features/Careers'
import { ContactForm } from '@/components/features/ContactForm'
import { Corporate } from '@/components/features/Corporate'
import { News } from '@/components/features/News'
import { Overview } from '@/components/features/Overview'
import { Product } from '@/components/features/Product'
import { RepresentativeMessage } from '@/components/features/RepresentativeMessage'
import { Footer } from '@/components/ui/Footer'
import { Header } from '@/components/ui/Header'
import { Box } from '@mui/material'

export default function Home() {
  return (
    <Box>
      <Header />
      <Corporate />
      <BusinessContent />
      <Product />
      <About />
      <News />
      <RepresentativeMessage />
      <Overview />
      <Careers />
      <ContactForm />
      <Footer />
    </Box>
  )
}
