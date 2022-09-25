import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Foot from '../../components/Foot';
import { about } from './aboutUI';
import Header from '../../components/headerComp/Header';
import { useSelector } from 'react-redux';

const About = () => {

  const loginReducer = useSelector((state) => state.loginReducer);
  const { acilDetails } = loginReducer;

  const labels = [
    {label: 'Home', link:'/', acilDetails: false},
    { label:"About", link: '/about', acilDetails: false},
    { label:"Invest", link: "/invest", acilDetails: false},
    {label: "Register", link:"/register", acilDetails: acilDetails},
    { label: "Login", link: "/login", acilDetails: acilDetails },
    {label: "Profile", link:`/profile/${acilDetails && acilDetails.id}`, acilDetails: !acilDetails},
    {label: "Logout", link:"/", acilDetails: !acilDetails},
  ]

  return (
    <Box sx={about}>
      <Grid container direction='column'>
        <Header labels={labels} labels1={labels} />
        {/* Main */}
        <Grid sx={about.main} item>
          <Grid item sx={about.main1} md={4} sm={5}>
            <Typography variant='h1'>
              Who We Are
            </Typography>
            <Typography variant='body1'>
              ACIL was established for the sole purpose of  providing smallholder farmers with
              a reliable route to market and fair prices for their produce. <br/>We Source & Trade
              agricultural commodities making it available for the local and international
              Markets
            </Typography>
          </Grid>
        </Grid>
        {/* Mission */}
        <Grid item container justifyContent='center'>
          <Grid item xs={11} sm={10} lg={8} sx={about.mission}>
            <Typography variant='h2' gutterBottom align='center'>
              What We Do & Our Mission
            </Typography>
            <Typography variant='body1' gutterBottom>
              Our Trade Transparency Solutions are making rural agricultural markets work
              better for farmers, aggregators and buyers.
              <br /><br />
            </Typography>
            <Typography variant='h4' gutterBottom>
              What We Do
            </Typography>
            <Typography variant='body1'>
              With our available resources, Africa has the capacity to supply enough food to
              ensure no one ever goes to sleep hungry. We believe that smallholder farmers
              are the key to ACIL business is focused on trading in various Agro products in
              Nigeria and internationally. The company has been trading & merchandising
              various agro based products in all the principal world markets and to the end
              users in major consumption markets. Capitalizing on Nigeria's vast geographical
              spread and range of reasons, ACIL has successfully provided superior quality
              range of products, to its buyers all over the world. The company is present
              in every aspect of trade of bulk agro commodities from importing, selling
              domestically, to exporting and doing third country trade. <br/><br/> Driven by the
              consumption and production disparity in the agro sector, ACIL has made efforts
              to tap the opportunities in the said sector. The Company has been successful
              in grabbing an increasing market share in domestic & International markets.
              The Keys Products of ACIL are :Ginger Cocoa beans, Cashew nuts, soya bean,
              soya bean oil, sesame seed, kola nut, bitter kola etc. Through its presence
              in Agri Trading business, ACIL tries to maintain the balance between
              profit-making (which makes economic sense to be present in any business)
              and giving back to the society which goes hand in hand with our ultimate
              goal of contributing into Nigeria’s target of inclusive growth. our continent's
              food production potential. That's why we empower them, leveraging our
              technology to access finance, and improve productivity & sales to promote
              food security.<br /><br /> Our key focus areas are Impact, Scale, and Technology.
              <br /><br />
            </Typography>
            <Typography variant='h4'>
              Our Mission...
              <br />
            </Typography>
            <Typography variant='body1'>
              Our mission is to increase smallholder farmer incomes through integrating them
              into sustainable value chains.<br /><br /> We do this by bringing together
              the ‘supply power’ of millions of small-scale producers, to meet the demand
              of local, regional and international markets.<br /><br />Our Trade Transparency
              Solutions are making rural agricultural markets work better for farmers,
              aggregators and buyers. We are keen to become a major supplier in the industry.              <br /><br />We believe the market is a growing one and with our growing pool of farmers, we are not only stationed to provide  large quantities of agro products but to provide top quality products
            </Typography>
          </Grid>
        </Grid>
        <Foot/>
      </Grid>
    </Box>
  )
}

export default About