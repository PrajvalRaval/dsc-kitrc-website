import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Section, Container } from '@components/global';
import ExternalLink from '@common/ExternalLink';

const EVENTS = [
  {
    name: "Flutter Interact Extended",
    description: "A live viewing party for Flutter Interact, in this livestream Google will showcase the latest from Google Design and Flutter, Google’s free and open source UI toolkit to build beautiful, natively compiled applications for mobile, web, and desktop - all from a single codebase",
    date: "Dec 11, 2019",
    location: "TBA",
    time: "TBA",
    formlink: "#",
    image: 'flutter.png',
  },
];

const UsedBy = () => (
  <StaticQuery
  query={graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "events" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    
    art_team: file(
      sourceInstanceName: { eq: "art" }
      name: { eq: "team" }
    ) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
`}
    render={data => (
      <Section id="events" accent>
        <StyledContainer>
        <div>
            <h1>Upcoming Events</h1>
            
            {EVENTS.map(({ name, description, date, location, formlink, time, image }) => {
              const img = data.allFile.edges.find(
                ({ node }) => node.relativePath === image
              ).node;

              return (
                <div key={name}>
                  <Grid>
                      <Art>
                          <Img fluid={img.childImageSharp.fluid} alt={name} />
                      </Art>

                      <div>
                      
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <br></br>

                        <p>Date: {date}</p>
                        <p>Location: {location}</p>
                        <p>Time: {time}</p>
                        <br></br>

                        <h3>
                        {/* <StyledExternalLink href={formlink}>
                            Register Here &#10138;
                        </StyledExternalLink> */}
                        <StyledExternalLink href={formlink}>
                            Registeration Open Soon
                        </StyledExternalLink>
                        </h3>

                      </div>

                  </Grid>
                </div>
              );
            })}
       </div>
        </StyledContainer>
      </Section>
    )}
  />
);

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr ;
  grid-gap: 80px;
  text-align: left;
  align-items: left;
  justify-items: left;
  margin: 80px 0;

  ${props =>
    props.inverse &&
    `
    text-align: left;
    grid-template-columns: 2fr 3fr;
  `}

  h2 {
    margin-bottom: 16px;
  }

  @media (max-width: ${props => props.theme.screen.md}) {
    grid-template-columns: 1fr;
    text-align: left;
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 24px;
    }

    ${props =>
      props.inverse &&
      `
        ${Art} {
          order: 2;
        }
    `}
  }
`;

const Art = styled.figure`
  margin: 0;
  max-width: 580px;
  width: 100%;
`;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (max-width: ${props => props.theme.screen.md}) {
    justify-content: center;
  }
`;

 const StyledExternalLink = styled(ExternalLink)`
   color: inherit;
   text-decoration: none;

   &:hover {
     color: ${props => props.theme.color.register};
   }
 `;

export default UsedBy;
