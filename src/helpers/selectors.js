//state is an object containing days(an array of objects that contains days of the week and related appointments) and appointments(an object of objects containing information regarding each appointment). The function below returns an array of all appointments for a specific day(informed in the second argument)
function getAppointmentsForDay (state, day) {
  const final = []  
  let appointments

  //if days data is empty return an empty array
  if(state.days.length === 0){
    return final
  }

  //checking the object key for all appointments occurring in the specified date(coming from the argument)
  for(let i of state.days){
    if(day === i.name){
      appointments = i.appointments
    }
  }

  //if the day informed through the argument is not found return an empty array
  if(!appointments){
    return final
  }

  //pushing into the final array all objects containing the info on appointments for the specified day
  for(let i of appointments){
    final.push(state.appointments[`${i}`])
    //console.log(state.appointments[`${i}`])
  }
  console.log(final)
  return final;
};

module.exports = getAppointmentsForDay;