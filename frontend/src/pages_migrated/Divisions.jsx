import React from 'react';
import Hero from '../components/ui/Hero';
import { Section } from '../components/ui/Section';
import Card from '../components/ui/Card';

const DIVISIONS_DATA = [
  { id: 'agri', title: 'Agriculture', desc: 'Powering the foundation of our cooperative.', link: '/div-agri' },
  { id: 'fin', title: 'Financial', desc: 'Empowering members through fiscal independence.', link: '/divisions/financial' },
  { id: 'mfg', title: 'Manufacturing', desc: 'Adding value through industrial cooperative units.', link: '/div-mfg' },
  { id: 'edu', title: 'Education', desc: 'Building the knowledge base of our community.', link: '/div-edu' },
  { id: 'svc', title: 'Services', desc: 'Professional support for sustainable growth.', link: '/div-svc' },
];

const Divisions = () => {
  return (
    <div className="w-full font-inter bg-[#fdfdfd]">
      <Hero 
        image="/img/ag1.png"
        tag="Kalpavruksha Ecosystem"
        title="Our"
        titleAccent="Divisions"
        subtitle="A multi-sectoral ecosystem driving collective prosperity."
      />

      <Section bg="white" className="pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {DIVISIONS_DATA.map((div) => (
            <Card 
              key={div.id}
              to={div.link}
              title={div.title}
              subtitle={div.desc}
              className="min-h-[160px] flex flex-col justify-center"
            />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Divisions;
