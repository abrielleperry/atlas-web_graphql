query {
  project(id: "1") {
    title
    weight
    description
    tasks {
      title
      weight
      description
    }
  }
}