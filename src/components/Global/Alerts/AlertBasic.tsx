// utils/showTailwindAlert.ts
export function showTailwindAlert({
    message,
    type = 'error',
    duration = 3000, // ms
  }: {
    message: string;
    type?: 'error' | 'success';
    duration?: number;
  }) {
    const div = document.createElement('div');
    div.className = `
      fixed top-4 right-4 z-50 px-4 py-3 rounded-lg text-sm shadow-md transition-all duration-300
      ${type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' : ''}
      ${type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : ''}
    `;
    div.innerText = message;
  
    document.body.appendChild(div);
  
    setTimeout(() => {
      div.classList.add('opacity-0');
      setTimeout(() => div.remove(), 300);
    }, duration);
  }
  