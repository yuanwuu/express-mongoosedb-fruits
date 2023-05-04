const React = require("react");
// const Nav = require("../components/Nav");
const DefaultLayout = require("../layout/Default");

class Index extends React.Component {
  render() {
    const { fruits } = this.props;
    return (
      <DefaultLayout 
        title="Fruits Index Page"
        link="/fruits/new"
        text="Create a Fruit"
        >

         
        {/* <h1>Fruits Index Page</h1>
        <Nav link="/fruits/new" text="Create a Fruit" /> */}


        <ul>
          {fruits.map((fruit, i) => {
            return (
              <li key={i}>
                The <a href={`/fruits/${fruit._id}`}>{fruit.name}</a> is{" "}
                {fruit.color} <br></br>
                {fruit.readyToEat
                  ? `It is ready to eat`
                  : `It is not ready to eat`}
                <br />


                {/* --------------------- EDIT --------------------  
                link to this specific fruit's edit page */}
                <a href={`/fruits/${fruit._id}/edit`}>Edit This Fruit</a>



                {/* --------------------- DELETE -------------------- 
                delete button, it's a form bc we need to make a req. to our server.  
                can't use handleClick in the server  */}
                <form 
                  action={`/fruits/${fruit._id}?_method=DELETE`} 
                  method="POST" 
                  //looks like a POST request, however from the line above server is using "_method"(methodOverride) to perform a DELETE request action.  _method=DELETE (key/value pair)
                > 
                  <input type="submit" value="DELETE" />
                </form>

              </li>
            );
          })}
        </ul>
      </DefaultLayout>
    );
  }
}

module.exports = Index;
