import Image from "next/image";
import styles from "./page.module.css";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";
import Head from "next/head";

export default function Home() {
  // Stripe integration - payment
  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
    
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

  return (
  <Container maxWidth="100vw">
    <Head>
      <title>Flashcard SaaS</title>
      <meta name="description" content="Create flashcard from your text" />
    </Head>
    {/* Header and Navigation */}
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{flexGrow: 1}}>
          Flashcard SaaS
        </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
      </Toolbar>
    </AppBar>

    {/* Hero Section - headline, subheadline, call-to-action */}
    <Box sx={{textAlign: 'center', my: 4}}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Flashcard SaaS
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        The easiest way to create flashcards from your text.
      </Typography>
      <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
        Get Started
      </Button>
      <Button variant="outlined" color="primary" sx={{mt: 2}}>
        Learn More
      </Button>
    </Box>

    {/* Features - Grid Layout */}
    <Box sx={{my: 6, textAlign: 'center'}}>
      <Typography variant="h4" component="h2" gutterBottom>Features</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
          <Typography>
            {' '}
            Simply input your text and let our software do the rest. Creating ai flashcards has never been easier!
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
          <Typography>
            {' '}
            Our AI breaks down your text into concise, easy to understand flashcards!
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>Easily Accessible</Typography>
          <Typography>
            {' '}
            Acces your flashcards from any device. Study on the go!
          </Typography>
        </Grid>
      </Grid>
    </Box>

    {/* Pricing */}
    <Box sx={{my: 6, textAlign: 'center'}}>
      <Typography variant="h4" component="h2" gutterBottom>Pricing</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2, }}>
            <Typography variant="h5" gutterBottom>Basic</Typography>
            <Typography variant="h6" gutterBottom>$5 / month</Typography>
            <Typography>
              {' '}
              Access to basic AI Flashcard features and limited storage
            </Typography>
            <Button variant="contained" color="primary" sx={{mt: 2}}>
              Choose Basic
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 3, border: '1px solid', borderColor: 'grey.300', borderRadius: 2, }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                {' '}
                Unlimited AI Flashcard features and limited storage with priority support
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
      </Grid>
    </Box>
  </Container>
  );
}
