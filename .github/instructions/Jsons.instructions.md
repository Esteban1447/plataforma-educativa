---
applyTo: '**'


---
/users
[
  {
    "id": 1,
    "name": "Carlos",
    "email": "admin",
    "password": "123",
    "phone": "123",
    "userType": "Administrator"
  },
  {
    "id": 2,
    "name": "Profe ingles",
    "email": "i@i",
    "password": "1234",
    "phone": "123",
    "userType": "Teacher"
  },
  {
    "id": 3,
    "name": "Estudiante ingles 1",
    "email": "e@e1",
    "password": "123",
    "phone": "123",
    "userType": "Student"
  },
  {
    "id": 4,
    "name": "Estudiante 2 ingles",
    "email": "e@e2",
    "password": "123",
    "phone": "123",
    "userType": "Student"
  },
  {
    "id": 5,
    "name": "Profe ingles 2",
    "email": "m@m",
    "password": "123",
    "phone": "123",
    "userType": "Teacher"
  },
  {
    "id": 6,
    "name": "Profe mates",
    "email": "m@m2",
    "password": "123",
    "phone": "123",
    "userType": "Teacher"
  },
  {
    "id": 7,
    "name": "Esteban",
    "email": "e@e",
    "password": "123",
    "phone": "123",
    "userType": "Student"
  },
  {
    "id": 8,
    "name": "Esteban22",
    "email": "esteban@e",
    "password": "123",
    "phone": "123",
    "userType": "Student"
  }
]


/grades
[
  {
    "id": 1,
    "student": {
      "id": 49,
      "user": {
        "id": 3,
        "name": "Estudiante ingles 1",
        "email": "e@e1",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": null,
    "grade": null,
    "evaluationDate": null,
    "score": null
  },
  {
    "id": 2,
    "student": {
      "id": 50,
      "user": {
        "id": 4,
        "name": "Estudiante 2 ingles",
        "email": "e@e2",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": null,
    "grade": null,
    "evaluationDate": null,
    "score": null
  },
  {
    "id": 3,
    "student": {
      "id": 49,
      "user": {
        "id": 3,
        "name": "Estudiante ingles 1",
        "email": "e@e1",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": {
      "id": 1,
      "name": "Ingles",
      "course": {
        "id": 44,
        "name": "Ingles"
      }
    },
    "grade": 5,
    "evaluationDate": "2025-06-11",
    "score": 5
  },
  {
    "id": 4,
    "student": {
      "id": 50,
      "user": {
        "id": 4,
        "name": "Estudiante 2 ingles",
        "email": "e@e2",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": {
      "id": 1,
      "name": "Ingles",
      "course": {
        "id": 44,
        "name": "Ingles"
      }
    },
    "grade": 2.8,
    "evaluationDate": "2025-06-11",
    "score": 2.8
  },
  {
    "id": 5,
    "student": {
      "id": 52,
      "user": {
        "id": 8,
        "name": "Esteban22",
        "email": "esteban@e",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": null,
    "grade": null,
    "evaluationDate": null,
    "score": null
  },
  {
    "id": 6,
    "student": {
      "id": 52,
      "user": {
        "id": 8,
        "name": "Esteban22",
        "email": "esteban@e",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": {
      "id": 2,
      "name": "Matematicas",
      "course": {
        "id": 45,
        "name": "Matematicas"
      }
    },
    "grade": 3,
    "evaluationDate": "2025-06-12",
    "score": 3
  },
  {
    "id": 7,
    "student": {
      "id": 51,
      "user": {
        "id": 7,
        "name": "Esteban",
        "email": "e@e",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": {
      "id": 1,
      "name": "Ingles",
      "course": {
        "id": 44,
        "name": "Ingles"
      }
    },
    "grade": null,
    "evaluationDate": null,
    "score": null
  },
  {
    "id": 8,
    "student": {
      "id": 52,
      "user": {
        "id": 8,
        "name": "Esteban22",
        "email": "esteban@e",
        "password": "123",
        "phone": "123",
        "userType": "Student"
      },
      "grade": -1,
      "bornDate": "2025-06-09",
      "direction": "ads"
    },
    "subject": {
      "id": 1,
      "name": "Ingles",
      "course": {
        "id": 44,
        "name": "Ingles"
      }
    },
    "grade": 5,
    "evaluationDate": "2025-06-12",
    "score": 5
  }
]

/teachers
[
  {
    "id": 3,
    "speciality": "Ingles",
    "courses": [
      {
        "id": 44,
        "name": "Ingles"
      }
    ],
    "user": {
      "id": 2,
      "name": "Profe ingles",
      "email": "i@i",
      "password": "1234",
      "phone": "123",
      "userType": "Teacher"
    }
  },
  {
    "id": 4,
    "speciality": "Matematicas",
    "courses": [
      {
        "id": 45,
        "name": "Matematicas"
      }
    ],
    "user": {
      "id": 5,
      "name": "Profe ingles 2",
      "email": "m@m",
      "password": "123",
      "phone": "123",
      "userType": "Teacher"
    }
  },
  {
    "id": 5,
    "speciality": "Matematicas",
    "courses": [],
    "user": {
      "id": 6,
      "name": "Profe mates",
      "email": "m@m2",
      "password": "123",
      "phone": "123",
      "userType": "Teacher"
    }
  }
]

/students

[
  {
    "id": 49,
    "user": {
      "id": 3,
      "name": "Estudiante ingles 1",
      "email": "e@e1",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 1,
        "student": {
          "id": 49,
          "user": {
            "id": 3,
            "name": "Estudiante ingles 1",
            "email": "e@e1",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": null,
        "grade": null,
        "evaluationDate": null,
        "score": null
      },
      {
        "id": 3,
        "student": {
          "id": 49,
          "user": {
            "id": 3,
            "name": "Estudiante ingles 1",
            "email": "e@e1",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": 5,
        "evaluationDate": "2025-06-11",
        "score": 5
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  },
  {
    "id": 50,
    "user": {
      "id": 4,
      "name": "Estudiante 2 ingles",
      "email": "e@e2",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 2,
        "student": {
          "id": 50,
          "user": {
            "id": 4,
            "name": "Estudiante 2 ingles",
            "email": "e@e2",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": null,
        "grade": null,
        "evaluationDate": null,
        "score": null
      },
      {
        "id": 4,
        "student": {
          "id": 50,
          "user": {
            "id": 4,
            "name": "Estudiante 2 ingles",
            "email": "e@e2",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": 2.8,
        "evaluationDate": "2025-06-11",
        "score": 2.8
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  },
  {
    "id": 51,
    "user": {
      "id": 7,
      "name": "Esteban",
      "email": "e@e",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 7,
        "student": {
          "id": 51,
          "user": {
            "id": 7,
            "name": "Esteban",
            "email": "e@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": null,
        "evaluationDate": null,
        "score": null
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  },
  {
    "id": 52,
    "user": {
      "id": 8,
      "name": "Esteban22",
      "email": "esteban@e",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 5,
        "student": {
          "id": 52,
          "user": {
            "id": 8,
            "name": "Esteban22",
            "email": "esteban@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": null,
        "grade": null,
        "evaluationDate": null,
        "score": null
      },
      {
        "id": 6,
        "student": {
          "id": 52,
          "user": {
            "id": 8,
            "name": "Esteban22",
            "email": "esteban@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 2,
          "name": "Matematicas",
          "course": {
            "id": 45,
            "name": "Matematicas"
          }
        },
        "grade": 3,
        "evaluationDate": "2025-06-12",
        "score": 3
      },
      {
        "id": 8,
        "student": {
          "id": 52,
          "user": {
            "id": 8,
            "name": "Esteban22",
            "email": "esteban@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": 5,
        "evaluationDate": "2025-06-12",
        "score": 5
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  }
]

/students

[
  {
    "id": 49,
    "user": {
      "id": 3,
      "name": "Estudiante ingles 1",
      "email": "e@e1",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 1,
        "student": {
          "id": 49,
          "user": {
            "id": 3,
            "name": "Estudiante ingles 1",
            "email": "e@e1",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": null,
        "grade": null,
        "evaluationDate": null,
        "score": null
      },
      {
        "id": 3,
        "student": {
          "id": 49,
          "user": {
            "id": 3,
            "name": "Estudiante ingles 1",
            "email": "e@e1",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": 5,
        "evaluationDate": "2025-06-11",
        "score": 5
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  },
  {
    "id": 50,
    "user": {
      "id": 4,
      "name": "Estudiante 2 ingles",
      "email": "e@e2",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 2,
        "student": {
          "id": 50,
          "user": {
            "id": 4,
            "name": "Estudiante 2 ingles",
            "email": "e@e2",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": null,
        "grade": null,
        "evaluationDate": null,
        "score": null
      },
      {
        "id": 4,
        "student": {
          "id": 50,
          "user": {
            "id": 4,
            "name": "Estudiante 2 ingles",
            "email": "e@e2",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": 2.8,
        "evaluationDate": "2025-06-11",
        "score": 2.8
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  },
  {
    "id": 51,
    "user": {
      "id": 7,
      "name": "Esteban",
      "email": "e@e",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 7,
        "student": {
          "id": 51,
          "user": {
            "id": 7,
            "name": "Esteban",
            "email": "e@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": null,
        "evaluationDate": null,
        "score": null
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  },
  {
    "id": 52,
    "user": {
      "id": 8,
      "name": "Esteban22",
      "email": "esteban@e",
      "password": "123",
      "phone": "123",
      "userType": "Student"
    },
    "grades": [
      {
        "id": 5,
        "student": {
          "id": 52,
          "user": {
            "id": 8,
            "name": "Esteban22",
            "email": "esteban@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": null,
        "grade": null,
        "evaluationDate": null,
        "score": null
      },
      {
        "id": 6,
        "student": {
          "id": 52,
          "user": {
            "id": 8,
            "name": "Esteban22",
            "email": "esteban@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 2,
          "name": "Matematicas",
          "course": {
            "id": 45,
            "name": "Matematicas"
          }
        },
        "grade": 3,
        "evaluationDate": "2025-06-12",
        "score": 3
      },
      {
        "id": 8,
        "student": {
          "id": 52,
          "user": {
            "id": 8,
            "name": "Esteban22",
            "email": "esteban@e",
            "password": "123",
            "phone": "123",
            "userType": "Student"
          },
          "grade": -1,
          "bornDate": "2025-06-09",
          "direction": "ads"
        },
        "subject": {
          "id": 1,
          "name": "Ingles",
          "course": {
            "id": 44,
            "name": "Ingles"
          }
        },
        "grade": 5,
        "evaluationDate": "2025-06-12",
        "score": 5
      }
    ],
    "grade": -1,
    "bornDate": "2025-06-09",
    "direction": "ads"
  }
]

/subjects
[
  {
    "id": 1,
    "name": "Ingles",
    "course": {
      "id": 44,
      "name": "Ingles"
    }
  },
  {
    "id": 2,
    "name": "Matematicas",
    "course": {
      "id": 45,
      "name": "Matematicas"
    }
  }
]

/courses
[{"id":44,"name":"Ingles"},{"id":45,"name":"Matematicas"}]
Coding standards, domain knowledge, and preferences that AI should follow.