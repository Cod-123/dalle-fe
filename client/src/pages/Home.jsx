import React,{ useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components'

// a Functional Component that takes in data and title and renders the cards basically the iamges
const RenderCards = ({ data,title })=>{

    //render all data if data is not null 
    if(data?.length > 0)
    {
        return data.map((post) => <Card key={post._id} {...post} />)
    }
 
    // render a title if data is null or empty
    return(
        <h2 className='mt-5 font-bold text-[#ff0000] text-xl uppercase'>{title}</h2>
    )

    }






const Home = () => {

  const [loading, setLoading] = useState(false);

  const [allPosts, setAllPosts] = useState(null);//usestate to display all the posts

  const [searchText, setSearchText] = useState('');//this nd below  usestates are used for the search functionality
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  //used for retreiving and display the posts on home page
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try{
        //const response = await fetch('http://localhost:8081/api/v1/post',{
       const response = await fetch('https://dalle-backend-lbzo.onrender.com/api/v1/post',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },

       });

       if(response.ok)
       {
        const result = await response.json();
        setAllPosts(result.data.reverse()); //reverse to display the latest post first
       }
      }
      catch(error){
        alert(error);
      }
      
      finally{
        setLoading(false);
      }
    };

    fetchPosts();
  },[]); //empty dependency array so that it runs only once when the component is rendered for the first time
  
  //the search functionality
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout); // clears the previously set timeout
    setSearchText(e.target.value);//val is set to search

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),// 500 ms delay in order to prevent the search from being triggered on every key press and give some time to enter the search query
    );
  };




return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#ffff00] text-[32px]">Saved Images</h1>
        <p className="mt-2 text-[#ffff00] text-[14px] max-w-[500px]">Have a look at the collection of imaginative and visually creative images generated</p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for <span className="text-[#ffff00]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Posts Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home