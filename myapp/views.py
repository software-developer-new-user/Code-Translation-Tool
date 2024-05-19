from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
import gensim
from gensim import corpora
from sklearn.metrics.pairwise import cosine_similarity
from gensim.models import LdaModel


import google.generativeai as genai

import torch
import numpy as np
from scipy.sparse import csr_matrix

#*******************************
genai.configure(api_key="", transport='rest')   #Put your own Google API key here.

genai_model = genai.GenerativeModel("gemini-1.5-pro-latest")

def translate_code(sourceCode, sourceLanguage, targetLanguage):
    prompt = f"""As an expert code developer proficient in multiple programming languages with years of experience, please translate the source code in {sourceLanguage} to programming language {targetLanguage} within the supported version. 
    The detailed information are as follows:
    1. Target programming language: {targetLanguage}
    2. Source code\n: {sourceCode}
        
    Respond should be the code you produced in the respective programming language version.
    Please make sure that the target code is executable and do not use ``` and do not include the target language in the front.
     """
    response = genai_model.generate_content(prompt)
    return response.text


@csrf_exempt
#@require_http_methods(["POST"])
def compare_texts(request):
    try:
        print(request.method)
        print("Got the request")
        #return JsonResponse({'error': 'Invalid JSON'}, status=400)
        #return JsonResponse({"Success":1})
        data = json.loads(request.body)
        sourceCode = data.get('text1')
        text2 = data.get('text2')
        sourceLanguage = data.get('sourceLanguage')
        targetLanguage = data.get('targetLanguage')
        print(sourceLanguage, targetLanguage)
        code = "s = input()\nk = int(input())\nc = [0]*26\nfor i in range(len(s)):\n    c[ord(s[i])-97] += 1\nif min(c) >= k:\n    print(0)\nelse:\n    print(min(k-min(c), len(s)))"
        target_code = translate_code(sourceCode, sourceLanguage, targetLanguage)
        result = {"text2":target_code}

        return JsonResponse(result)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    
# code = "#include <bits\/stdc++.h>\n\nusing namespace std;\n\nint main()\n{\n    int n,a,b,c;\n    cin>>n>>a>>b>>c;\n    int res=0;\n    for(int i=0;i<=n;i++){\n        for(int j=0;j<=n;j++ ){\n            int k=(n-(i*a)-(j*b))\/c;\n            if(k<0){k=0;}\n            if((i*a)+(j*b)+(c*k)==n){\n                res=max(res,i+j+k);\n            }\n        }\n    }\n    cout <<res;\n    return 0;\n}\n\t\t\t\t\t         \t\t \t     \t  \t  \t\t"

# print(translate_code(code, "C++", "Python"))