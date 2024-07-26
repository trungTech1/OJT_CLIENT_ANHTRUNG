import React from "react";
import "./About.scss";

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

const AboutPage: React.FC = () => {
  const stats = [
    { value: "10.5k", label: "Sellers active our site" },
    { value: "33k", label: "Monthly Product Sale" },
    { value: "45.5k", label: "Customer active in our site" },
    { value: "25k", label: "Annual gross sale in our site" },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Tom Cruise",
      position: "Founder & Chairman",
      image: "tom-cruise.jpg",
    },
    {
      name: "Emma Watson",
      position: "Managing Director",
      image: "emma-watson.jpg",
    },
    {
      name: "Will Smith",
      position: "Product Designer",
      image: "will-smith.jpg",
    },
  ];

  const features = [
    {
      icon: "truck",
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "headphones",
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "shield",
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="about-page">
      <nav>
        <a href="/">Home</a> / <span>About</span>
      </nav>

      <section className="our-story">
        <div className="content">
          <h1>Our Story</h1>
          <p>
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="image">
          <img src="shopping-women.jpg" alt="Shopping women" />
        </div>
      </section>

      <section className="stats">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3>{stat.value}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="team">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
            <div className="social-links">
              <a href="#" className="icon-twitter"></a>
              <a href="#" className="icon-instagram"></a>
              <a href="#" className="icon-linkedin"></a>
            </div>
          </div>
        ))}
      </section>

      <section className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <div className={`icon icon-${feature.icon}`}></div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
