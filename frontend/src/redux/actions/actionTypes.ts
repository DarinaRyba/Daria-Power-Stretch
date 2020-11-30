export const actionTypes = {
  LOAD_WORKOUTS: 'LOAD_WORKOUTS',
  LOAD_WORKOUTS_ERROR: 'LOAD_WORKOUTS_ERROR',
  LOAD_WORKOUT: 'LOAD_WORKOUT',
  LOAD_WORKOUT_ERROR: 'LOAD_WORKOUT_ERROR'
};

export interface Workouts {
    name: string
    description: string
    price: number
}

export interface LoadWorkoutsAction {
    type: typeof actionTypes.LOAD_WORKOUTS
    workouts: Workouts[]
}

export interface LoadWorkoutAction {
    type: typeof actionTypes.LOAD_WORKOUT
    workout: Workouts[]
}

export interface LoadWorkoutsErrorAction {
    type: typeof actionTypes.LOAD_WORKOUTS_ERROR
    workoutsError: string
}

export interface LoadWorkoutErrorAction {
    type: typeof actionTypes.LOAD_WORKOUT_ERROR
    workoutError: string
}
