//ToDo
// fix IsMovingSelectedElementsAndNotCreatingSelectionBox = false; and movment of selected elements

////////////////////////////////////
// Constractor
////////////////////////////////////

window.onload = function () {
  // Get Element References
  CanvasContainer = document.getElementById("CanvasContainer");
  Canvas = document.getElementById("Canvas");
  CanvasContext = Canvas.getContext("2d");
  LableMousePosition = document.getElementById("LableMousePosition");

  // Todo: make it bigger
  Canvas.width = 400;
  Canvas.height = 300;

  CanvasContainer.scroll({
    top: (Canvas.height - CanvasContainer.parentElement.scrollHeight) / 2,
    left: (Canvas.width - CanvasContainer.parentElement.scrollWidth) / 2,
    behavior: "smooth",
  });

  // Debug start elements
  var center = { X: Canvas.width / 2, Y: Canvas.height / 2 };
  Elements = [
    new Point(center.X, center.Y, 20, "#808080", "Point1 gray"),
    new Point(center.X + 100, center.Y + 100, 25, "#FF0000", "Point2 red"),
    new Point(center.X - 50, center.Y - 50, 10, "#00FF00", "Point3 green"),
  ];

  UpdateUI();

  // Event Listeners
  Canvas.addEventListener("mousedown", MouseDown);
  Canvas.addEventListener("mouseup", MouseUp);
  Canvas.addEventListener("mousemove", MouseMove);
  Canvas.addEventListener("mouseout", MouseOut);
};

////////////////////////////////////
// Properties
////////////////////////////////////

var CanvasContainer;
var Canvas;
var CanvasContext;

var Elements;

var IsMouseDown = false;
var IsMovingSelectedElementsAndNotCreatingSelectionBox;
var SelectedElements = [];
var SelectionBox;

var CurrentMouseDownPosition = { X: 0, Y: 0 };
var LastMouseDownPosition = { X: 0, Y: 0 };
var LableMousePosition;

MouseX = function (event) {
  return (
    event.clientX -
    CanvasContainer.getBoundingClientRect().x +
    CanvasContainer.scrollLeft
  );
};

MouseY = function (event) {
  return (
    event.clientY -
    CanvasContainer.getBoundingClientRect().y +
    CanvasContainer.scrollTop
  );
};

////////////////////////////////////
// Functions
////////////////////////////////////

// Clear the canvas
function ClearCanvas() {
  CanvasContext.clearRect(0, 0, Canvas.width, Canvas.height);
}

// Draw all elements on canvas
function UpdateUI() {
  ClearCanvas();

  for (var i = 0; i < Elements.length; i++) {
    var moveToTempPosition;
    if (SelectedElements.includes(Elements[i])) moveToTempPosition = true;
    else moveToTempPosition = false;
    Elements[i].Draw(CanvasContext, moveToTempPosition);
  }

  if (SelectionBox) SelectionBox.Draw(CanvasContext);
}

// Select topest element on that position only
function SelectElementAt(MousePosition) {
  // Backwork to find topest element
  for (var i = Elements.length - 1; i >= 0; i--)
    if (Elements[i].IsPointInElement(MousePosition.X, MousePosition.Y))
      return Elements[i];
  return null;
}

// Check if mouse in same position as last mouse down
function IsCurrentPointSameLast() {
  return (
    CurrentMouseDownPosition.X == LastMouseDownPosition.X &&
    CurrentMouseDownPosition.Y == LastMouseDownPosition.Y
  );
}

// Mouse events
function MouseDown(e) {
  // - if mouse down already , return
  // - if mouse clicked on element that selected then move all selected elements as mouse dose and keep selections
  // - if mouse clicked on empty space then deselect all and start new selections

  // Save current mouse position
  CurrentMouseDownPosition = { X: MouseX(e), Y: MouseY(e) };

  if (IsMouseDown) {
    IsMouseDown = false;
    MouseUp(e);
    console.log("Error: MouseDown already");
    return;
  }

  // if current click not on one of selected elements then make selection posiple
  var ElementInCurrentPosition = SelectElementAt(CurrentMouseDownPosition);
  if (SelectedElements.includes(ElementInCurrentPosition))
    IsMovingSelectedElementsAndNotCreatingSelectionBox = true;
  else if (ElementInCurrentPosition == null)
    IsMovingSelectedElementsAndNotCreatingSelectionBox = false;
  else {
    ElementInCurrentPosition.ResetTempPosition();
    SelectedElements = [ElementInCurrentPosition];
    IsMovingSelectedElementsAndNotCreatingSelectionBox = true;
  }

  // Save mouse down position
  LastMouseDownPosition = CurrentMouseDownPosition;
  IsMouseDown = true;
  UpdateUI();
}

function MouseUpBKB(e) {
  // 	- if there is no mousedown then return
  // //- if position is same as mousedown then select
  // - if there already started selection box then save selected items into the list
  // handle selection stuff
  var debugLine = [" - MouseUp():"];

  //IsMovingSelectedElementsAndNotCreatingSelectionBox = false;
  var tmpIsMovingSelectedElementsAndNotCreatingSelectionBox = false;
  if (!IsMouseDown) return;

  // Save current mouse position
  CurrentMouseDownPosition = { X: MouseX(e), Y: MouseY(e) };

  // Check if mouseup is clicked one element
  if (IsCurrentPointSameLast()) {
    debugLine.push("IsCurrentPointSameLast = true");
    // User clicked on same point
    var SelectedElement = SelectElementAt(CurrentMouseDownPosition);

    if (SelectedElement) {
      debugLine.push("SelectedElement = true");
      // User clicked on one element
      if (SelectedElements.includes(SelectedElement)) {
        debugLine.push("SelectedElement.includes(SelectedElement) = true");
        // User clicked on one element that is selected
        // Keep selections so user can move them if he want
      } else {
        debugLine.push("SelectedElement.includes(SelectedElement) = false");
        // User clicked on one element that is not selected
        // Select only that element
        SelectedElement.ResetTempPosition();
        SelectedElements = [SelectedElement];
      }
      tmpIsMovingSelectedElementsAndNotCreatingSelectionBox = true;
    } else {
      debugLine.push("SelectedElement = false");
      // User clicked on different point (empty space)
      // Deselect all
      SelectedElements = [];
    }
  } else {
    debugLine.push("IsCurrentPointSameLast = false");

    // save new selected elements positions
    for (var i = 0; i < SelectedElements.length; i++) {
      SelectedElements[i].SaveTempPosition();
    }

    // User make selection box on different points
    // Select all elements in selection box
    SelectedElements = [];
    for (var i = 0; i < Elements.length; i++)
      if (Elements[i].IsElementInArea(SelectionBox)) {
        Elements[i].ResetTempPosition();
        SelectedElements.push(Elements[i]);
      }
    tmpIsMovingSelectedElementsAndNotCreatingSelectionBox = true;
    SelectionBox = null;
  }

  // Log all selected elements for debuging
  for (var i = 0; i < SelectedElements.length; i++) {
    console.log(SelectedElements[i].id);
  }

  // Save mouse down position
  LastMouseDownPosition = CurrentMouseDownPosition;
  IsMouseDown = false;
  IsMovingSelectedElementsAndNotCreatingSelectionBox =
    tmpIsMovingSelectedElementsAndNotCreatingSelectionBox;

  debugLine.push("");
  debugLine.push("SelectedElements.length: " + SelectedElements.length);
  debugLine.push(
    "IsMovingSelectedElementsAndNotCreatingSelectionBox: " +
      IsMovingSelectedElementsAndNotCreatingSelectionBox
  );
  debugLine.push("LastMouseDownPosition: " + LastMouseDownPosition);
  console.log(debugLine.join("\n"));
  UpdateUI();
}

function MouseUp(e) {
  // 	- if there is no mousedown then return
  // //- if position is same as mousedown then select
  // - if there already started selection box then save selected items into the list
  // handle selection stuff

  if (!IsMouseDown) return;

  var debugLine = [" - MouseUp():"];
  var tmpIsMovingSelectedElementsAndNotCreatingSelectionBox = false;

  // Save current mouse position
  CurrentMouseDownPosition = { X: MouseX(e), Y: MouseY(e) };

  // Check if mouseup is clicked one element
  var ElementInCurrentPosition = SelectElementAt(CurrentMouseDownPosition);

  // User clicked one element -> select it
  if (
    IsCurrentPointSameLast() &&
    ElementInCurrentPosition != null &&
    !SelectedElements.includes(ElementInCurrentPosition)
  ) {
    debugLine.push("User clicked one element -> select it");
    ElementInCurrentPosition.ResetTempPosition();
    SelectedElements = [ElementInCurrentPosition];
    tmpIsMovingSelectedElementsAndNotCreatingSelectionBox = true;
  }
  // User clicked on element that was selected
  else if (
    ElementInCurrentPosition != null &&
    SelectedElements.includes(ElementInCurrentPosition)
  ) {
    debugLine.push("User clicked on element that was selected");
    SelectedElements.forEach((e) => e.SaveTempPosition());
    tmpIsMovingSelectedElementsAndNotCreatingSelectionBox = true;
  }
  // User Clicked on empty space -> deselect all
  else if (IsCurrentPointSameLast() && ElementInCurrentPosition == null) {
    debugLine.push("User Clicked on empty space -> deselect all");
    for (var i = 0; i < SelectedElements.length; i++)
      SelectedElements[i].SaveTempPosition();
    SelectedElements = [];
  }
  // User was moving selected elements and now he clicked on one of them -> save new selected elements positions
  else if (
    !IsCurrentPointSameLast() &&
    SelectedElements.length > 0 &&
    IsMovingSelectedElementsAndNotCreatingSelectionBox
  ) {
    debugLine.push(
      "User was moving selected elements and now he clicked on one of them -> save new selected elements positions"
    );
    for (var i = 0; i < SelectedElements.length; i++)
      SelectedElements[i].SaveTempPosition();
  }
  // User make selection box -> select all elements in selection box
  else if (
    !IsMovingSelectedElementsAndNotCreatingSelectionBox &&
    SelectionBox != null
  ) {
    debugLine.push(
      "User make selection box -> select all elements in selection box"
    );
    SelectedElements = [];
    for (var i = 0; i < Elements.length; i++)
      if (Elements[i].IsElementInArea(SelectionBox)) {
        Elements[i].ResetTempPosition();
        SelectedElements.push(Elements[i]);
      }
    tmpIsMovingSelectedElementsAndNotCreatingSelectionBox = true;
  }

  // Log all selected elements for debuging
  for (var i = 0; i < SelectedElements.length; i++) {
    console.log(SelectedElements[i].id);
  }

  // Save mouse down position
  LastMouseDownPosition = CurrentMouseDownPosition;
  IsMouseDown = false;
  SelectionBox = null;
  IsMovingSelectedElementsAndNotCreatingSelectionBox =
    tmpIsMovingSelectedElementsAndNotCreatingSelectionBox;

  debugLine.push("");
  debugLine.push("SelectedElements.length: " + SelectedElements.length);
  debugLine.push(
    "IsMovingSelectedElementsAndNotCreatingSelectionBox: " +
      IsMovingSelectedElementsAndNotCreatingSelectionBox
  );
  debugLine.push("LastMouseDownPosition: " + LastMouseDownPosition);
  console.log(debugLine.join("\n"));
  UpdateUI();
}

function MouseMove(e) {
  // - if mouse is not down then return
  // - if mousedown and there selected element then move them as mouse is moving
  // - if mousedown and there is no selected element then draw selection box

  // Save current mouse position
  CurrentMouseDownPosition = { X: MouseX(e), Y: MouseY(e) };

  // Update mouse position
  LableMousePosition.innerHTML =
    "Mouse : " + CurrentMouseDownPosition.X + ", " + CurrentMouseDownPosition.Y;

  if (!IsMouseDown) return;

  // Check if mouse is on one of selected elements
  if (
    SelectedElements.length > 0 &&
    IsMovingSelectedElementsAndNotCreatingSelectionBox
  ) {
    // Move all selected elements as mose is moving
    for (var i = 0; i < SelectedElements.length; i++) {
      SelectedElements[i].TempPosition(
        CurrentMouseDownPosition.X - LastMouseDownPosition.X,
        CurrentMouseDownPosition.Y - LastMouseDownPosition.Y
      );
    }
  } else {
    // Generate selection box
    SelectionBox = Rectangle.FromTwoPoints(
      LastMouseDownPosition,
      CurrentMouseDownPosition
    );
  }
  UpdateUI();
}

function MouseOut(e) {
  // Reset mouse position on canvas
  LableMousePosition.innerHTML = "";

  // disable mouse down?
  IsMouseDown = false;
}

////////////////////////////////////
