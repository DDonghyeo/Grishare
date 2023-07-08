package com.grishare.bankapi;

import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class EcaApi {

    public JSONArray getApi() throws IOException {

        String urlSt = "https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=ed90pnNE2SIakWdLLiwigWU4VZCUJw24&data=AP01";
        urlSt += "&searchdate=20230707";
//        LocalDate now = LocalDate.now();
//        // 포맷 정의
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
//
//        // 포맷 적용
//        String formatedNow = now.format(formatter);
//
//        urlSt+=formatedNow;

        // REST API 호출
        URL url = new URL(urlSt);
        HttpURLConnection conn = (HttpURLConnection)url.openConnection();

        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-Type", "application/json"); // Content-Type 지정
        conn.setDoOutput(true); // 출력 가능 상태로 변경
        conn.connect();

        // 데이터  읽어오기
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        StringBuilder sb = new StringBuilder();
        String line = "";
        while((line = br.readLine()) != null) {
            sb.append(line); // StringBuilder 사용시 객체를 계속 생성하지 않고 하나의 객체릂 수정하므로 더 빠름.
        }
        conn.disconnect();

        // JSON Parsing
        return new JSONArray(sb.toString());
    }
}
