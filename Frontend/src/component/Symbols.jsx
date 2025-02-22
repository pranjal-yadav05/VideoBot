
import React from 'react';
export default function FloatingSymbols  (){
    const symbols = [
      '∑', '∫', 'π', '∞', '±', '≠', '⊕', 'θ', 'Δ', 'λ', 
      '∇', 'μ', 'α', 'β', 'γ', '∈', '∉', '∪', '∩', '⊆',
      'ω', 'φ', 'ψ', '∂', '√', '∀', '∃', '⇒', '⇔', '≈',
      '≤', '≥', '×', '÷', '∏', '∅', 'ℝ', 'ℕ', 'ℤ', 'ℚ',
      '∠', '∡', '∢', '∴', '∵', '∼', '≅', '≡', '∝', '∞'
    ];
    
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {symbols.map((symbol, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${20 + Math.random() * 50}px`,
              animation: `floating-${i} ${25 + Math.random() * 15}s infinite linear`,
              color: '#edeff2',
              opacity: 0.15  // Adjusted for the lighter color
            }}
          >
            <style>
              {`
                @keyframes floating-${i} {
                  0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0.15;
                  }
                  25% {
                    transform: translate(${100 + Math.random() * 150}px, ${100 + Math.random() * 150}px) rotate(90deg);
                    opacity: 0.2;
                  }
                  50% {
                    transform: translate(${-100 - Math.random() * 150}px, ${150 + Math.random() * 150}px) rotate(180deg);
                    opacity: 0.15;
                  }
                  75% {
                    transform: translate(${-150 - Math.random() * 150}px, ${-100 - Math.random() * 150}px) rotate(270deg);
                    opacity: 0.2;
                  }
                  100% {
                    transform: translate(0, 0) rotate(360deg);
                    opacity: 0.15;
                  }
                }
              `}
            </style>
            {symbol}
          </div>
        ))}
      </div>
    );
  };