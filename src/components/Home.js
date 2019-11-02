import React from 'react'
import { connect } from 'react-redux'



// import 'react-bulma-components/dist/react-bulma-components.min.css'
import Section from 'react-bulma-components/lib/components/section'
import Heading from 'react-bulma-components/lib/components/heading'
import Container from 'react-bulma-components/lib/components/container'


function Home({ dispatch, isLoggingOut, logoutError }) {
  

  return (
     <Section>
        <Container>
          <Heading>Bienvenue</Heading>
          <Heading subtitle>
            sur le site de <strong>M. Le Jolly</strong>.
          </Heading>
          <Heading subtitle>
            Certaines ressources sont ouvertes à tous, mais d'autres sont réservées à mes élèves.
          </Heading>
        </Container>
      </Section>
  )
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.disconnecting,
    logoutError: state.auth.logoutError,
  }
}
export default connect(mapStateToProps)(Home)
