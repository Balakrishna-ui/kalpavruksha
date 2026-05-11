import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProject } from '../../hooks/useProject';
import SEO from '../../components/common/SEO';
import Button from '../../components/ui/Button';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { project, loading, error } = useProject(slug);

  if (loading) return <div className="py-20 text-center font-bold">Loading...</div>;
  if (error || !project) return <div className="py-20 text-center font-bold text-red-500">Project not found</div>;

  return (
    <div className="w-full font-inter">
      <SEO 
        title={project.name} 
        description={project.description} 
        image={project.mainImg}
      />
      
      {/* Dynamic Hero Section */}
      <section 
        className="page-hero" 
        style={{ background: project.heroBg || 'linear-gradient(135deg, #1a2d5a, #2d4a8a)' }}
      >
        <div className="page-hero-content">
          <h1>{project.emoji} <span className="gold">{project.name}</span></h1>
          <p>Status: <span className="uppercase font-black text-gold">{project.status}</span></p>
        </div>
      </section>

      <div className="page-body">
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
          <button className="btn-view-all" onClick={() => navigate("/projects")} style={{ marginBottom: '32px' }}>
            ← Back to All Projects
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
            {/* Left: Project Image & Progress */}
            <div>
              <div
                style={{ 
                  borderRadius: '24px', 
                  overflow: 'hidden', 
                  height: '420px', 
                  background: `url('${project.mainImg}') center/cover`,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              ></div>
              <div className="mt-8 p-6 bg-forest/5 rounded-2xl border border-forest/10">
                <div className="flex justify-between mb-2">
                  <span className="text-xs font-black uppercase text-forest">Project Progress</span>
                  <span className="text-xs font-black text-gold">{project.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold transition-all duration-1000" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right: Project Content */}
            <div>
              <span className="text-[10px] font-black uppercase text-gold tracking-[0.3em] mb-3 block">
                {project.badgeLabel || 'Sustainable Impact'}
              </span>
              <h2 style={{ fontFamily: '\'Cinzel\',serif', fontSize: '2.5rem', color: '#1c2d5a', margin: '12px 0' }}>
                {project.name}
              </h2>
              <div style={{ height: '3px', background: '#c6a75e', width: '80px', marginBottom: '32px' }}></div>
              
              <p style={{ color: '#444', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '24px', fontWeight: '500' }}>
                {project.description}
              </p>
              
              {project.vision && (
                <div className="bg-white p-6 rounded-2xl border-l-4 border-gold shadow-sm mb-8">
                  <h4 className="text-xs font-black uppercase text-gold mb-2">The Vision</h4>
                  <p className="text-gray-600 italic">"{project.vision}"</p>
                </div>
              )}

              <Button to="/contact" variant="primary">
                Get Involved →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
