module Main exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes as Attr
import Html.Events as Events


type alias Flags =
    { safeAreaTopInPx : Int
    }


type alias Application =
    { model : Model
    , safeAreaTopInPx : Int
    }


type alias Model =
    { count : Int
    }


type Msg
    = Increment
    | Decrement



-- INIT


init : Flags -> ( Application, Cmd Msg )
init flags =
    ( { model = { count = 0 }
      , safeAreaTopInPx = flags.safeAreaTopInPx
      }
    , Cmd.none
    )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | count = model.count + 1 }, Cmd.none )

        Decrement ->
            ( { model | count = model.count - 1 }, Cmd.none )


updateApplication : Msg -> Application -> ( Application, Cmd Msg )
updateApplication msg app =
    let
        ( newModel, cmd ) =
            update msg app.model
    in
    ( { app | model = newModel }, cmd )



-- VIEW


viewport : Application -> Browser.Document Msg
viewport app =
    { title = "{{PROJECT_NAME}}"
    , body =
        [ safeAreaSpacer app.safeAreaTopInPx
        , view app.model
        ]
    }


safeAreaSpacer : Int -> Html msg
safeAreaSpacer topInPx =
    Html.div
        [ Attr.style "height" (String.fromInt topInPx ++ "px")
        , Attr.style "background-color" "#1a1a2e"
        ]
        []


view : Model -> Html Msg
view model =
    Html.div
        [ Attr.style "height" "100%"
        , Attr.style "width" "100%"
        , Attr.style "background-color" "#1a1a2e"
        , Attr.style "color" "#eee"
        , Attr.style "font-size" "20vw"
        , Attr.style "display" "flex"
        , Attr.style "flex-direction" "column"
        , Attr.style "align-items" "center"
        , Attr.style "justify-content" "center"
        ]
        [ counter model.count
        , button "+" Increment
        , button "-" Decrement
        ]


counter : Int -> Html msg
counter count =
    Html.div [] [ Html.text <| String.fromInt count ]


button : String -> Msg -> Html Msg
button label action =
    Html.div
        [ Attr.style "cursor" "pointer"
        , Attr.style "user-select" "none"
        , Events.onClick action
        ]
        [ Html.text label ]



-- MAIN


main : Program Flags Application Msg
main =
    Browser.document
        { init = init
        , update = updateApplication
        , view = viewport
        , subscriptions = always Sub.none
        }
