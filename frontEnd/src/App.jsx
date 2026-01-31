import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Center from './Components/Center/Center'
import Nav from './Components/Nav/Nav'

export default function App() {
  const [Page, setPage] = useState("Home")
const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="App">
      <Navbar />
      <Center page={Page}  isLoading={isLoading} setIsLoading={setIsLoading}/>
      <Nav onSelectPage={setPage} />
      <Footer />
    </div>
  )
}
