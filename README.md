# MVP-snake
Snake game developed with MVP (Model  - View - Presenter) architectural pattern.

## Features

 - Implementation of the **MVP** pattern with Typescript
 - Usage of the **Observer** pattern for notifying Presenter when Model data changes
 - **Public API** - each part of application use only those module entities that are presented in the public interface 

## MVP
**Model–view–presenter** (**MVP**) is a derivation of the model–view–controller (MVC) architectural pattern. This pattern divides an application into three major aspects: **Model**, **View**, and **Presenter**.

![MVP scheme](https://github.com/White11010/MVP-snake/blob/main/blob/MVP.svg)

### Model

The Model describes the business logic and data. It also defines business rules for data means how the data can be changed and manipulated.

### View

UI (User Interface) layer. It provides the visualization of the data and keep a track of the user’s action in order to notify the **Presenter**.

### Presenter

Fetch the data from the **Model** and applies the UI logic to decide what to display. It manages the state of the **View** and takes actions according to the user’s input notification from the **View**.
