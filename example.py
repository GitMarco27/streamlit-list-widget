import sys

import streamlit as st

# Temporarily remove the current directory from sys.path
if "" in sys.path:
    sys.path.remove("")

from streamlit_list_widget import streamlit_list_widget

images = {
    "Golden Retriever": "https://www.zooplus.it/magazine/wp-content/uploads/2017/05/fotolia_66749097.jpg",
    "Labrador": "https://www.tuttogreen.it/wp-content/uploads/2019/03/shutterstock_1212827962.jpg",
    "Pomerania": "https://www.purina.it/sites/default/files/2021-02/BREED%20Hero_0095_pomeranian.jpg",
    "Alberto": "https://m.media-amazon.com/images/I/61k4ead-zGL._AC_UF350,350_QL80_.jpg",
}

with st.sidebar:
    theme = st.selectbox("Theme", options=["light", "dark"])
    selected = streamlit_list_widget(
        items=list(images.keys()), title="Dogs", theme=theme
    )  # Added theme parameter

if selected:
    st.title(selected)
    st.image(images[selected], caption=selected)
else:
    st.info("Select an item from the list widget")
