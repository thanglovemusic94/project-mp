import React, { useEffect } from 'react'
import MainSlider from './components/MainSlider'
import MainVideo from './components/MainVideo'
import MainMagazine from './components/MainMagazine'
import MainBanner from './components/MainEvent'
import MainTutor from './components/MainTutor'
import MainNotice from './components/MainNotice'
import MainPopup from './components/MainPopup'

const Main = () => {
  useEffect(() => {
    document.body.classList.add('main-page')

    return function cleanup() {
      document.body.classList.remove('main-page')
    }
  }, [])
  return (
    <>
      <MainSlider />
      <MainVideo />
      <MainMagazine />
      <MainBanner />
      <MainTutor />
      <MainNotice />
      <MainPopup />
    </>
  )
}

export default Main
