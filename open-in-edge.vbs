Option Explicit
Dim sh, fso, http, root, edge, python, url, html, ready, i
Set sh = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

root = fso.GetParentFolderName(WScript.ScriptFullName)
html = root & "\index.html"
python = "C:\Users\motoo\AppData\Local\Programs\Python\Python312\python.exe"
edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
If Not fso.FileExists(edge) Then
  edge = "C:\Program Files\Microsoft\Edge\Application\msedge.exe"
End If
url = "http://127.0.0.1:8765/"

Function IsUp()
  On Error Resume Next
  Set http = CreateObject("MSXML2.XMLHTTP")
  http.Open "GET", url, False
  http.setRequestHeader "Cache-Control", "no-cache"
  http.Send
  If Err.Number = 0 Then
    If http.Status = 200 Then
      IsUp = True
      Exit Function
    End If
  End If
  Err.Clear
  IsUp = False
End Function

ready = IsUp()
If Not ready Then
  If fso.FileExists(python) Then
    sh.CurrentDirectory = root
    sh.Run """" & python & """ -m http.server 8765", 0, False
    For i = 1 To 15
      WScript.Sleep 200
      If IsUp() Then
        ready = True
        Exit For
      End If
    Next
  End If
End If

If ready Then
  sh.Run """" & edge & """ " & url, 1, False
Else
  sh.Run """" & edge & """ """ & html & """", 1, False
End If
