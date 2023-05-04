const React = require("react")
const Nav = require("../components/Nav")

class Index extends React.Component {
  render() {
    const { veggies } = this.props
    return(
      <div>
        <h1>Veggies Index Page</h1>
        <Nav link="/veggies/new" text="Create a Veggie"/>
        <ul>
            {veggies.map((veggie, i) => {
                return (
                    <li key={i}>
                        The {" "}
                        <a href={`/veggies/${veggie._id}`}>
                            {veggie.name}
                        </a>{" "}
                        is {veggie.color} <br></br>
                        {veggie.readyToEat
                            ? `It is ready to eat`
                            : `It is not ready to eat`}
                        <br />
                    </li>
                );
            })}
        </ul>
    </div>
    )
  }
}

module.exports = Index

