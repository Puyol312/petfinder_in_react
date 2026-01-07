import React from "react";

function HelpImage({ img }:{img:string } ) {
  return (
    <div className="col-12 col-lg-5 mb-4 mb-lg-0">
      <div className="position-relative overflow-hidden rounded-3 shadow-lg" style={{ height: '320px' }}>
        <div
          className="position-absolute w-100 h-100 transition-transform"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
        }}>
          <span className="badge bg-primary fs-6">
            <i className="bi bi-heart-fill me-2"></i>
            Ayuda a reunir familias
          </span>
        </div>
      </div>
    </div>
  );
}

function StepItem({ icon, title, description, delay }: {icon:string, title:string, description:string, delay:number}) {
  return (
    <li className="mb-3 d-flex align-items-start" style={{
      animation: `fadeInUp 0.6s ease ${delay}s both`
    }}>
      <div className="flex-shrink-0 me-3">
        <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" style={{
          width: '40px',
          height: '40px'
        }}>
          <i className={`bi ${icon} text-primary fs-5`}></i>
        </div>
      </div>
      <div>
        <strong className="d-block mb-1">{title}</strong>
        <span className="text-muted small">{description}</span>
      </div>
    </li>
  );
}

function HelpText() {
  return (
    <div className="col-lg-7 d-flex flex-column justify-content-center">
      <div className="mb-4">
        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
          ¿Cómo funciona?
        </span>
        <h3 className="mb-3 fw-bold" style={{ fontSize: '1.75rem', lineHeight: '1.3' }}>
          Tu asistente para encontrar mascotas perdidas
        </h3>
        <p className="text-muted mb-4" style={{ fontSize: '1.05rem' }}>
          PetFinder es una plataforma diseñada para ayudar a personas a encontrar
          y reportar mascotas perdidas o encontradas. Todo funciona de manera simple:
        </p>
      </div>

      <ul className="list-unstyled mb-4">
        <StepItem 
          icon="bi-camera-fill"
          title="Crea un reporte"
          description="Con foto, ubicación y detalles de la mascota"
          delay={0.1}
        />
        <StepItem 
          icon="bi-geo-alt-fill"
          title="Otros usuarios pueden verla"
          description="En el mapa o en la lista de reportes"
          delay={0.2}
        />
        <StepItem 
          icon="bi-chat-dots-fill"
          title="Pueden contactarte"
          description="Si la vieron o tienen información útil"
          delay={0.3}
        />
        <StepItem 
          icon="bi-envelope-fill"
          title="Vos recibís su mensaje"
          description="Directo al mail y tomás acción inmediata"
          delay={0.4}
        />
      </ul>

      <div className="alert alert-info border-0 mb-4" style={{
        backgroundColor: '#e7f3ff',
        animation: 'fadeIn 0.6s ease 0.5s both'
      }}>
        <i className="bi bi-info-circle-fill me-2"></i>
        <strong>Nuestro objetivo:</strong> Conectar personas rápidamente para aumentar 
        las chances de reunir mascotas con sus dueños.
      </div>

      <div style={{ animation: 'fadeIn 0.6s ease 0.6s both' }}>
        <a href="/" className="btn btn-primary btn-lg px-4 py-2 shadow-sm">
          <i className="bi bi-house-fill me-2"></i>
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}

function HelpCard({ img }:{img:string }) {
  return (
    <div className="card border-0 shadow-lg overflow-hidden" style={{
      animation: 'fadeInUp 0.8s ease'
    }}>
      <div className="card-body p-4 p-md-5">
        <div className="row g-4 align-items-center">
          <HelpImage img={img} />
          <HelpText />
        </div>
      </div>
    </div>
  );
}

export function HelpPage() {
  // Placeholder image
  const imgHelp = "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop";
  
  return (
    <>
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3) !important;
          transition: all 0.3s ease;
        }
        
        .card {
          transition: transform 0.3s ease;
        }
      `}</style>
      
      <div className="container py-5">
        <div className="text-center mb-5" style={{ animation: 'fadeIn 0.6s ease' }}>
          <div className="d-inline-block mb-3">
            <i className="bi bi-question-circle text-primary" style={{ fontSize: '3rem' }}></i>
          </div>
          <h1 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
            ¿Cómo funciona PetFinder?
          </h1>
          <p className="text-muted lead">
            Una plataforma simple y efectiva para reunir mascotas con sus familias
          </p>
        </div>
        
        <HelpCard img={imgHelp} />
        
        <div className="text-center mt-5" style={{ animation: 'fadeIn 0.6s ease 0.8s both' }}>
          <p className="text-muted">
            <i className="bi bi-shield-check text-success me-2"></i>
            Tu información está segura y solo se comparte cuando decidís responder
          </p>
        </div>
      </div>
    </>
  );
}