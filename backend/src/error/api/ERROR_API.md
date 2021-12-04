# Errors in de API
In de status code van de request moet een bijkomende status code komen gedefinieerd in `httpStatusCodes.ts`.

De response body van een API error moet er zo uitzien:
```json
error : {
    status : {zelfde als http status code}
    code : {eigen error code}
    message : {bericht geschikt voor de UI, eventueel vertaald}
    detail : {bericht welke gedetailleerd is voor een developer, altijd in het engels}
    more_info : {bijvoorbeeld: https://cijferhulp.com/developer/wiki/api/error/{code}}
}
```