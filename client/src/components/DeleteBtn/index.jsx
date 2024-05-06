// DeleteBtn component
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    // Using the spread operator to apply all props to the span element
    <span {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

// Exporting the DeleteBtn component
export default DeleteBtn;
