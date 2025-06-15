import React from 'react'
import { Link } from 'react-router-dom';


import { Helmet } from 'react-helmet'

import FeatureCard from '../components/feature-card'
import Question1 from '../components/question1'
import '../styles/home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>PATIENTSYS-DevOps</title>
        <meta property="og:title" content="Nautical Frank Mole" />
      </Helmet>
      <div className="home-hero">
        <div className="heroContainer home-hero1">
          <div className="home-container1">
            <h1 className="home-hero-heading heading1">
              Distributed Patient Information System
            </h1>
            <span className="home-hero-sub-heading bodyLarge">
              <span>
                <span>
                  <span>Empowering Healthcare Providers</span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
                <span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
              </span>
              <span>
                <span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
                <span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                  <span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
              </span>
            </span>
            <div className="home-btn-group">
              <button className="buttonFilled">Learn More</button>
              <button className="buttonFlat">Learn More →</button>
            </div>
          </div>
        </div>
      </div>
      <div className="home-login-info">
        <p>Test Login Information</p>
        <p>You can log in with one of the pre-created accounts:</p>
        <p>admin@kth.se / Admin1234 → roles: user + admin</p>
        <p>ethan@kth.se / Test1234 → roles: user + patient</p>
        <p>doctor@kth.se / Test1234 → roles: user + doctor</p>
        <p>Or create your own account using the register page (you will receive basic user credentials).</p>
      </div>
      <div className="home-features">
        <div className="featuresContainer">
          <div className="home-features1">
            <div className="home-container2">
              <span className="overline">
                <span>features</span>
                <br></br>
              </span>
              <h2 className="home-features-heading heading2">Key Features</h2>
              <span className="home-features-sub-heading bodyLarge">
                <span>
                  <span>
                    <span>
                      Experience the power of our distributed patient
                      information system with these features
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                </span>
                <span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                  <span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                    <span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                </span>
              </span>
            </div>
            <div className="home-container3">
              <FeatureCard
                heading="Responsive Design"
                subHeading="Ensures optimal viewing experience across different devices"
              ></FeatureCard>
              <FeatureCard
                heading="Event-driven Interactions"
                subHeading="Enables real-time updates and notifications based on user actions"
              ></FeatureCard>
              <FeatureCard
                heading="Asynchronous Data Access"
                subHeading="Allows for efficient retrieval and processing of patient information"
              ></FeatureCard>
              <FeatureCard
                heading="Secure Authorization Workflows"
                subHeading="Ensures only authorized personnel can access and modify patient data"
              ></FeatureCard>
            </div>
          </div>
        </div>
      </div>
      <div className="home-faq">
        <div className="faqContainer">
          <div className="home-faq1">
            <div className="home-container4">
              <span className="overline">
                <span>FAQ</span>
                <br></br>
              </span>
              <h2 className="home-text34 heading2">Common questions</h2>
              <span className="home-text35 bodyLarge">
                <span>
                  Here are some of the most common questions that we get.
                </span>
                <br></br>
              </span>
            </div>
            <div className="home-container5">
              <Question1
                answer="A distributed patient information system is a software application that allows healthcare providers to access and manage patient data from multiple locations or systems."
                question="What is a distributed patient information system?"
              ></Question1>
              <Question1
                answer="Event-driven interactions in a patient information system refer to the system's ability to respond to specific events or triggers, such as data updates or user actions, by executing predefined actions or workflows."
                question="What are event-driven interactions in a patient information system?"
              ></Question1>
              <Question1
                answer="Asynchronous data access in a patient information system means that data retrieval and processing can occur independently of other tasks, allowing for efficient handling of large amounts of data and reducing system latency."
                question="What is asynchronous data access in a patient information system?"
              ></Question1>
              <Question1
                answer="Secure authorization workflows in a patient information system involve authentication mechanisms, role-based access control, and encryption techniques to ensure that only authorized individuals can access and modify patient data."
                question="How does secure authorization workflows work in a patient information system?"
              ></Question1>
              <Question1
                answer="User-friendly features in a patient information system include intuitive forms for entering patient data, autocomplete suggestions, error validation, search filters, and customizable dashboards for managing and tracking data retrieval requests."
                question="What user-friendly features are available for entering patient data and managing data retrieval requests?"
              ></Question1>
            </div>
          </div>
        </div>
      </div>
      <div className="home-footer">
        <footer className="footerContainer home-footer1">
          <div className="home-container6">
            <span className="logo">PATIENTSYS</span>
            <nav className="home-links">
              <Link to="/" className="buttonFlat">Home</Link>
              <Link to="/users" className="buttonFlat">Users</Link>
              <Link to="/health-events" className="buttonFlat">Health Events</Link>
              <Link to="/populate" className="buttonFlat">Populate</Link>
              <Link to="/dashboard" className="buttonFlat">Dashboard</Link>
            </nav>
          </div>
          <div className="home-separator"></div>
          <div className="home-container7">
            <span className="bodySmall home-text38">
              © 2024 devOps, for the future.
            </span>
            <div className="home-icon-group1">
              <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <svg
                    viewBox="0 0 950.8571428571428 1024"
                    className="home-icon10 socialIcons"
                >
                  <path
                      d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
                </svg>
              </a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  <svg
                      viewBox="0 0 877.7142857142857 1024"
                      className="home-icon12 socialIcons"
                  >
                    <path
                        d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
                  </svg>
                </a>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  <svg
                      viewBox="0 0 602.2582857142856 1024"
                      className="home-icon14 socialIcons"
                  >
                    <path
                        d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"></path>
                  </svg>
                </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
