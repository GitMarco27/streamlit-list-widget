import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"

interface State {
  numClicks: number
  isFocused: boolean
  clickedIndex: number | null // Track the index of the clicked item
}

class MyComponent extends StreamlitComponentBase<State> {
  public state = { numClicks: 0, isFocused: false, clickedIndex: null } // Initialize clickedIndex

  public render = (): ReactNode => {
    const items = this.props.args["items"] || []
    const title = this.props.args["title"] || "Chat history"; // Added title variable
    const theme = this.props.args["theme"] || "light"; // Added theme variable

    // Define colors based on the theme
    const backgroundColor = theme === "dark" ? '#262730' : '#F0F2F6'; // Default background color for dark theme
    const hoverColor = theme === "dark" ? '#1A1C24' : '#e0e0e0'; // Hover color remains the same
    const clickedColor = theme === "dark" ? '#0F1116' : '#d0d0d0'; // Clicked color for dark theme
    const fontColor = theme === "dark" ? '#FFFFFF' : '#000000'; // Set font color to white for dark theme

    // Ensure items is an array
    if (!Array.isArray(items)) {
      return (
        <div>
          <p>No items available.</p>
        </div>
      )
    }

    return (
      <div>
        <p style={{ fontWeight: 'bold', color: fontColor }}>{title}</p> {/* Set font color based on theme */}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {items.map((item: string, index: number) => (
            <button
              key={index}
              onClick={() => this.onItemClicked(item, index)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                borderRadius: '5px',
                backgroundColor: this.state.clickedIndex === index ? clickedColor : backgroundColor,
                transition: 'background-color 0.3s',
                fontSize: '14px',
                textAlign: 'left',
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                color: fontColor, // Set font color based on theme
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = hoverColor}
              onMouseLeave={(e) => {
                if (this.state.clickedIndex !== index) {
                  e.currentTarget.style.backgroundColor = backgroundColor;
                }
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    )
  }

  /** Click handler for item. */
  private onItemClicked = (item: string, index: number): void => {
    // Notify Streamlit of the clicked item.
    Streamlit.setComponentValue(item);
    this.setState({ clickedIndex: index }); // Update clickedIndex state
  }
}


// "withStreamlitConnection" is a wrapper function. It bootstraps the
// connection between your component and the Streamlit app, and handles
// passing arguments from Python -> Component.
//
// You don't need to edit withStreamlitConnection (but you're welcome to!).
export default withStreamlitConnection(MyComponent)
