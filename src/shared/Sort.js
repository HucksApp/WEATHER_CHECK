

const sorter = (data) => {


  //EXTRACT THE DATE -EXLUDE THE TIME
  const dateExtract = data.list.map(hourWeather => {
    return hourWeather.dt_txt.split(" ")[0]
  });
  
  //REMOVE DUBLICATION AND CREATE A NEW ARRAY REGISTRY
  const dateSetUp = new Set(dateExtract);
  const dateArray = [...dateSetUp];


// GROUP ARRAYS RELATION TO THE REGISTRY
  const dayZero = data.list.filter(hourWeather => {
    return hourWeather.dt_txt.split(" ")[0] === dateArray[0]
  });

  const dayOne = data.list.filter(hourWeather => {
    return hourWeather.dt_txt.split(" ")[0] === dateArray[1]
  });


  const dayTwo = data.list.filter(hourWeather => {
    return hourWeather.dt_txt.split(" ")[0] === dateArray[2]
  });
  
  const dayThree = data.list.filter(hourWeather => {
    return hourWeather.dt_txt.split(" ")[0] === dateArray[3]
  });

  const dayFour = data.list.filter(hourWeather => {
    return hourWeather.dt_txt.split(" ")[0] === dateArray[4]
  });

  const dayFive = data.list.filter(hourWeather => {
    return hourWeather.dt_txt.split(" ")[0] === dateArray[5]
  });



//RETURN THE DATA OBJECT SORTED
  return {

    genData: {

      city: data.city['name'],
      country: data.city['country'],
      population: data.city['population'],
      idRegistry: data
    },
    genDays: [
      dayZero[0], dayOne[0], dayTwo[0], dayThree[0], dayFour[0], dayFive[0]

    ],

    dayZero,
    dayOne,
    dayTwo,
    dayThree,
    dayFour


  }

}



export default sorter;