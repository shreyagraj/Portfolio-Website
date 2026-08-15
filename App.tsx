import RingCarousel from './RingCarousel'

export default function App() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <RingCarousel
        background="#0a0a0a"
        interaction={{ autoRotate: true, autoSpeed: 6 }}
        titleBar={{
          show: true,
          barFill: '#111111',
          titleColor: '#ffffff',
          padding: '12px 14px',
        }}
        caseButton={{
          show: true,
          label: 'View Case',
          background: '#ffffff',
          textColor: '#000000',
          hoverBackground: '#333333',
          hoverTextColor: '#ffffff',
        }}
      />
    </main>
  )
}
